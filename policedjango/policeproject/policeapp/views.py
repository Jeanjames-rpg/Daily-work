from django.shortcuts import render
from .models import Cases
from .models import Criminals
from .models import Officers
from .models import policestation
from .models import firs
from .models import Vehicle
from .models import casecriminal

# Create your views here.

def case_list(request):
    cases=Cases.objects.all()
    return render(request,"caselist.html", {"cases":cases})

def criminal_list(request):
    criminal=Criminals.objects.all()
    return render(request,"criminallist.html",{"criminal":criminal})

def officer_list(request):
    of =Officers.objects.all()
    return render(request,"officer.html",{"officer":of})

def police_station(request):
    pst=policestation.objects.all()
    return render(request,"station.html",{"pstation":pst})

def Fir(request):
    f= firs.objects.all()
    return render(request,"fir.html",{"fir":f})

def vehicles(request):
    vh=Vehicle.objects.all()
    return render(request,"vehiclelist.html",{"vehicle":vh})

def c_c(request):
    cc=casecriminal.objects.all()
    return render(request,"casecriminal.html",{"case_criminal":cc})

def home(request):
    return render(request,"homepage.html")