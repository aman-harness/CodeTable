from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    # Use context to pass info to page	
    context = {}
    return render(request, 'CodeTable_app/index.html', context)


#	 Create your views here.
