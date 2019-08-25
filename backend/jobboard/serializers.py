from rest_framework import serializers
from .models import Job, Company, Industry

class CompanySerializer(serializers.ModelSerializer):
    industry = serializers.StringRelatedField(many=True)
    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'industry')

class JobSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = Job
        fields = ('id', 'name', 'description', 'company', 'location', 'salary_bottom', 'salary_top', 'published_date', 'remote', 'level')


class IndustrySerializer(serializers.ModelSerializer):
    pass
    class Meta:
        model = Industry
        fields = ('id', 'name')