# Generated by Django 2.1.2 on 2019-03-16 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mt300', '0003_auto_20190316_1250'),
    ]

    operations = [
        migrations.AddField(
            model_name='onetoonematches',
            name='remark',
            field=models.CharField(default='', max_length=100),
        ),
    ]