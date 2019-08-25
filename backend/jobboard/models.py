from django.db import models
from django.conf import settings
from django.utils import timezone
# Create your models here.


class Industry(models.Model):
    name = models.CharField(max_length = 200, unique = True)
    def __str__(self):
        return self.name
  


class Company(models.Model):
    name = models.CharField(max_length = 200)
    description = models.TextField()
    industry = models.ManyToManyField('Industry', related_name='companies')

    #breifly considered putting company here, however companies dont even have locations anymore
    def publish(self):
        self.save()

    def __str__(self):
        return self.name


class Job(models.Model):
    name = models.CharField(max_length = 200)
    description = models.TextField()
    salary_bottom = models.IntegerField()      #I want to search on salaries, it bugs me when it doesn't have that
    salary_top = models.IntegerField()
    company = models.ForeignKey('Company', related_name='jobs', on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    location = models.TextField()
    remote = models.BooleanField()

    LEVEL_CHOICES = [
        ('0', 'Junior'),
        ('1', 'Mid Level'),
        ('2', 'Senior'),
        ('3', 'Executive'),
    ]
    level = models.CharField(max_length = 225, choices=LEVEL_CHOICES, default=1,)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.name   

