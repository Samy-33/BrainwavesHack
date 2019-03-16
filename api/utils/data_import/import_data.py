from utils.string_utils import StringConstants
from dateutil.parser import parse
from datetime import datetime as dt
import os


from applications.mt300.models import MessageSG, MessageCP


class DataImporter:
    def __init__(self):
        pass

    def get_splitted_data_from_file(self, f_obj):
        data = list(x.strip() for x in f_obj.readlines())
        data = "".join(data)

        start_ind = 6
        if 'SG Ref' in data:
            start_ind = 5

        splitted_data = data.split(StringConstants.COLON_STRING)[start_ind:]
        # print(splitted_data)
        splitted_data = list(x.strip('-}') for x in splitted_data)
        return splitted_data

    def get_mapped_data_from_splitted_text(self, splitted_data):
        mp = dict()
        splitted_data = list(x for x in splitted_data if x != '')
        for ind, val in enumerate(splitted_data):
            if ind % 2 == 1:
                continue
            mp[f'c_{val}'] = splitted_data[ind + 1]
        return mp

    def read_file(self, filepath):
        with open(filepath, 'r') as f:
            data = self.get_splitted_data_from_file(f)
            mapped_data = self.get_mapped_data_from_splitted_text(data)
            # print(mapped_data)

            return mapped_data

    def map_to_database_keys(self, data):
        lst = set(['c_20', 'c_21', 'c_22A', 'c_94A', 'c_52A', 'c_82', 'c_87', 'c_36', 'c_53', 'c_56', 'c_57', 'c_58']) #  'c_32B', 'c_33B']
        new_map = dict()
        for key in data:
            if key in lst:
                new_map[key] = data[key]
            elif key[:-1] in lst:
                new_map[key[:-1]] = data[key]
            
            elif key == 'SG Ref':
                new_map['c_20'] = data[key]

            elif key in ['c_33B', 'c_32B']:
                values = data[key].strip().split()
                currency = values[0].strip()
                amount = float(values[1].strip())
                new_map[f'{key}_fi'] = currency
                new_map[f'{key}_se'] = amount
            elif key == 'c_77H':
                date = data[key][5:].strip()
                date = parse(date)
                # print(date.date())
                new_map[key] = date.date()

            elif key == 'c_30V' or key == 'c_30T':
                try:
                    date = data[key].strip()
                    date = parse(date)
                    # print(type(date))
                    new_map[key] = date.date()
                except:
                    new_map[key] = dt.today()

        return new_map
    
    def get_data_from_file(self, filepath):
        mapped_data = self.read_file(filepath)
        mapped_data = self.map_to_database_keys(mapped_data)
        # print(mapped_data)
        return mapped_data



data_importer = DataImporter()
# data_importer.get_data_from_file('/home/sam/Documents/hack/FullStack/Sample data/OneToOneMatchingSampleData/SgOneToOneMatchingSampleData/1_message.txt')

obj_list = []

dir_name = '/home/sam/Documents/hack/FullStack/Sample data/new test data/closefit_new_sample/close fit/sg close fit'

for filename in os.listdir(dir_name):
    print(f'gettting data for => {filename} ')
    data = data_importer.get_data_from_file(os.path.join(dir_name, filename))
    data_a = MessageSG()

    # print(data)

    # data_a.c_53 = data.get('c_53')

    for key in data:
        setattr(data_a, key, data[key])

    obj_list.append(data_a)

MessageSG.objects.bulk_create(obj_list)
    



'''
from utils.data_import import import_data

from applications.mt300.models import MessageSG
sg = MessageSG.objects.first()

MessageSG.get_matching_cp_messages(sg)
'''