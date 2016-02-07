from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from . import languages
import requests
import json

RUN_URL = u'https://api.hackerearth.com/v3/code/run/'
COMPILE_URL = u'https://api.hackerearth.com/v3/code/compile/'
CLIENT_SECRET = '9b6d81acf7b7c1d91d0dddbdbe1cb6de1c7bc7fe'

def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    # Use context to pass info to page	

    context = {'language': languages.lang}
    return render(request, 'CodeTable_app/index.html', context)


#	 Create your views here.

# def saveCode(request):
#     # return HttpResponse("Hello, world. You're at the polls index.")
#     # Use context to pass info to page	
#     response_string="hello"
#     print "In the save code"
#     langRecv = request.GET['lang']
#     print langRecv, '\n \n '
#     return HttpResponse(3)

def runCode(request):
	source = request.GET['category_id']

	data = {
	    'client_secret': CLIENT_SECRET,
	    'async': 0,
	    'source': source,
	    'lang': "PYTHON",
	    'time_limit': 5,
	    'memory_limit': 262144,
	}

	r = requests.post(RUN_URL, data=data)
	print r.json()
	return HttpResponse(json.dumps(r.json()), content_type="application/json")

def compileCode(request):
	source = request.GET['category_id']

	data = {
	    'client_secret': CLIENT_SECRET,
	    'async': 0,
	    'source': source,
	    'lang': "PYTHON",
	    'time_limit': 5,
	    'memory_limit': 262144,
	}

	r = requests.post(COMPILE_URL, data=data)
	print r.json()
	return HttpResponse(json.dumps(r.json()), content_type="application/json")


def saveCode(request):
	# print "Inside saveCode \n \n \n \n"
	source = request.GET['category_id']
	print 'Source :- ', source

	# r = requests.post(COMPILE_URL, data=data)
	# print r.json()
	return HttpResponse(3)


