from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import CompanySerializer, JobSerializer     
from .models import Job, Company


class JobView(viewsets.ModelViewSet):       
    serializer_class = JobSerializer        
    queryset = Job.objects.all()            

class CompanyView(viewsets.ModelViewSet):       
    serializer_class = CompanySerializer        
    queryset = Company.objects.all()    