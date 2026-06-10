from django.http import HttpResponse
from django.template import loader


def myhome(request):
    return HttpResponse("<h1>Hello welcome to my webpage!!</h1>")

def myabc(request):
    temp=loader.get_template("mypage.html")
    result=temp.render({},request)
    return HttpResponse(result)