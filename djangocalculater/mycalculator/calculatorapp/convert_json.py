import  json
import os
import django
import sys


sys.path.append(r'D:\pythonprogrms\djangocalculater\mycalculator')

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'mycalculator.settings'
)

django.setup()

from calculatorapp.models import Contact_details


data=list(Contact_details.objects.all())
with open("contacts.json",'w') as f:
    json.dump(data,f,indent=4)