from rest_framework import serializers
from .models import Job, Company

class JobSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField()

    class Meta:
        model = Job
        fields = ('id', 'name', 'description', 'company', 'location', 'salary_bottom', 'salary_top', 'published_date', 'remote')

class CompanySerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True)
    industry = serializers.StringRelatedField(many=True)
    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'industry', 'jobs')