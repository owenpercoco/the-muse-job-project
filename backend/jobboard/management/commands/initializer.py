from django.core.management.base import BaseCommand, CommandError
from jobboard.models import Job, Company, Industry

class Command(BaseCommand):
    help = 'adds either industries, companies, or jobs'

    #def add_arguments(self, parser):
        #parser.add_argument('poll_ids')

    def handle(self, *args, **options):
            #Industry.objects.create(name='test', description='testtest')
            industry = Industry.objects.get(name='Media')
            industry2 = Industry.objects.get(name='Healthcare')
            test_company = Company(name='test company', description='testing our initializer')
            test_company.save()
            test_company.industry.add(industry)
            test_company.industry.add(industry2)
            test_company.save()
            self.stdout.write(self.style.SUCCESS('Successfully Run'))