from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from applications.user.utils import UserConstants, color_code_from_rating


class User(AbstractUser):
    date_joined = models.DateTimeField(default=timezone.now)
    rating = models.IntegerField(default=1000)
    contribution_rating = models.IntegerField(default=500)
    dp_url = models.URLField(max_length=500, default=UserConstants.DEFAULT_DP_URL)
    institute = models.CharField(max_length=200, null=True)
    country = models.CharField(max_length=50, null=True)

    @property
    def color(self):
    	return color_code_from_rating(self.rating)

    @property
    def full_name(self):
        return self.get_full_name()


class Follower(models.Model):
	user = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
	follower = models.ForeignKey(User, related_name='follows', on_delete=models.CASCADE)
