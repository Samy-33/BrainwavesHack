# Generated by Django 2.1.2 on 2019-03-16 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mt300', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messagecp',
            name='c_32B_fi',
            field=models.CharField(max_length=5, verbose_name='currency to buy'),
        ),
        migrations.AlterField(
            model_name='messagecp',
            name='c_32B_se',
            field=models.DecimalField(decimal_places=2, max_digits=20, verbose_name='amount of currency to buy'),
        ),
        migrations.AlterField(
            model_name='messagecp',
            name='c_33B_fi',
            field=models.CharField(max_length=5, verbose_name='currency to sell'),
        ),
        migrations.AlterField(
            model_name='messagecp',
            name='c_33B_se',
            field=models.DecimalField(decimal_places=2, max_digits=20, verbose_name='amount of currency to sell'),
        ),
        migrations.AlterField(
            model_name='messagecp',
            name='c_56',
            field=models.CharField(max_length=20, null=True, verbose_name='intermediary'),
        ),
        migrations.AlterField(
            model_name='messagesg',
            name='c_32B_fi',
            field=models.CharField(max_length=5, verbose_name='currency to buy'),
        ),
        migrations.AlterField(
            model_name='messagesg',
            name='c_32B_se',
            field=models.DecimalField(decimal_places=2, max_digits=20, verbose_name='amount of currency to buy'),
        ),
        migrations.AlterField(
            model_name='messagesg',
            name='c_33B_fi',
            field=models.CharField(max_length=5, verbose_name='currency to sell'),
        ),
        migrations.AlterField(
            model_name='messagesg',
            name='c_33B_se',
            field=models.DecimalField(decimal_places=2, max_digits=20, verbose_name='amount of currency to sell'),
        ),
        migrations.AlterField(
            model_name='messagesg',
            name='c_56',
            field=models.CharField(max_length=20, null=True, verbose_name='intermediary'),
        ),
    ]