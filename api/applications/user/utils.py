from enum import Enum
from collections import OrderedDict

class ColorConstants(Enum):
	GREY = 'GREY'
	GREEN = 'GREEN'
	CYAN = 'CYAN'
	BLUE = 'BLUE'
	PURPLE = 'PURPLE'
	ORANGE = 'ORANGE'
	RED = 'RED'

class UserConstants:

	DEFAULT_DP_URL = 'https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg'

	rating_to_role_map = OrderedDict(sorted({
		1199: (ColorConstants.GREY, '#8a8d8b'),
		1399: (ColorConstants.GREEN, '#00cb44'),
		1599: (ColorConstants.CYAN, '#01dce3'),
		1899: (ColorConstants.BLUE, '#0131e3'),
		2099: (ColorConstants.PURPLE, '#d201e3'),
		2399: (ColorConstants.ORANGE, '#ff8b1e'),
		8000: (ColorConstants.RED, '#f01c1c')
	}.items()))


def color_code_from_rating(rating: int):
	
	if rating > 8000:
		return '#f01c1c'

	for t_rating, t_color in UserConstants.rating_to_role_map.items():
		if rating <= t_rating:
			return t_color[1]