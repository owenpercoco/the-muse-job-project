import requests
import json
from django.core.management.base import BaseCommand, CommandError
from jobboard.models import Job, Company, Industry

class Command(BaseCommand):
    help = 'adds either industries, companies, or jobs'
    dry = False
    company_limit = 10
    page_limit = 5
    
    def add_arguments(self, parser):
        #parser.add_argument('dry', default=False)
        pass
    def getCompanies(self, results):
        companies = []
        for item in results:
            companies.append({'name':item['name'], 
                              'description':item['description'], 
                              'industries':map(lambda x: x['name'], item['industries'])
                              })
        return companies

    def processIndustries(self, results, dry = False):
        industries = []
        for item in results:
            for industry in item['industries']:
                if industry['name'] not in industries:
                    industries.append(industry['name'])


        for industry_name in industries:
            if not dry:
                try:
                    Industry.objects.create(name=industry_name)
                except:
                    print("integrity error")
            print("successfully added industry: %s" % (industry_name))

    def processCompanies(self, companies, dry = False):
        for company_item in companies[:self.company_limit]:
            if not dry:
                t_company = Company(name=company_item['name'], description=company_item['description'])
                t_company.save()
                for industry_item in company_item['industries']:
                    t_company.industry.add(Industry.objects.get(name=industry_item))
                t_company.save()
            print("successfully added company: %s" % (company_item['name']))

    def processJobs(self, results, dry = False):
        level_choices = {
            'senior':'3',
            'entry':'1',
            'mid':'2',
            'internship':'0'
            }
        salary = {
                '0':(0, 15000),
                '1':(15000, 65000),
                '2':(65000, 120000),
                '3':(120000, 200000)
        }

        for item in results:
            company_name = item['company']['name']
            company = Company.objects.get(name=company_name) 

            if not item['levels']:
                level = '2'
            else:
                level = level_choices[item['levels'][0]['short_name']]



            if 'remote' in map(lambda x: x['name'], item['locations']):
                remote = True 
            else:
                remote = False
            job = Job(name = item['name'], 
                    description = item['contents'], 
                    salary_bottom = salary[level][0], salary_top = salary[level][1],
                    location = item['locations'][0]['name'],
                    remote = remote,
                    company = company,
                    level = level
                    )
            if not dry:
                job.save()
                job.publish()
                print("successfully added a job")
            else:
                print("dry, nothing addded")

    def handle(self, *args, **options):
            self.dry = False 

            url = r"https://www.themuse.com/api/public/companies?industry=Advertising%20and%20Agencies&industry=Arts%20and%20Music&industry=Consulting&industry=Education&industry=Entertainment%20%26%20Gaming&page=1"
            resp = requests.get(url)
            if resp.status_code != 200:
                self.stdout.write(self.style.WARNING('something went wrong'))
            else:

                results = resp.json()['results']
                self.processIndustries(results, dry = self.dry)

                companies = self.getCompanies(results)
                self.processCompanies(companies, dry = self.dry)
                
                for i in range(self.page_limit):
                    second_url = "https://www.themuse.com/api/public/jobs?company=" + '&company='.join(map(lambda x: x['name'], companies[:self.company_limit])) + "&page=%s&descending=true" % (str(i))
                
                    print(second_url)
                    resp2 = requests.get(second_url)

                    if resp2.status_code != 200:
                        self.stdout.write(self.style.WARNING('something went wrong'))
                    else:
                        print("Success on the second url!")
                        results = resp2.json()['results']
                        self.processJobs(results, dry = self.dry)
                    

            self.stdout.write(self.style.SUCCESS('Successfully Run'))