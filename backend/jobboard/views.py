from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import CompanySerializer, JobSerializer, IndustrySerializer  
from .models import Job, Company, Industry


class JobView(viewsets.ModelViewSet):       
    serializer_class = JobSerializer        
    queryset = Job.objects.all()            

class CompanyView(viewsets.ModelViewSet):       
    serializer_class = CompanySerializer        
    queryset = Company.objects.all()    

class IndustryView(viewsets.ModelViewSet):
    serializer_class = IndustrySerializer
    queryset = Industry.objects.all()