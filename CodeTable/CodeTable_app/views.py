from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from . import languages
import requests
import json
import string
import random

# Note : Cross-check for the randomly generate string that it's not already used

RUN_URL = u'https://api.hackerearth.com/v3/code/run/'
COMPILE_URL = u'https://api.hackerearth.com/v3/code/compile/'
CLIENT_SECRET = '9b6d81acf7b7c1d91d0dddbdbe1cb6de1c7bc7fe'



def index(request):
	N = 10
	file_id = '/CodeTable_app/' + ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(N)) + '/'
	return HttpResponseRedirect(file_id)

def detail(request, file_id):
	print file_id
	context = {'language': languages.lang}
	# return render(request, 'CodeTable_app/index.html', json.dumps(context))
	return render(request, 'CodeTable_app/index.html', {"obj_as_json": json.dumps(languages.lang)})

def runCode(request):
	# print "function called\n\n\n\n\n\n\n\n\n"
	source = request.GET['category_id']

	data = {
	    'client_secret': CLIENT_SECRET,
	    'async': 0,
	    'source': source,
	    'lang': "PYTHON",
	    'time_limit': 5,
	    'memory_limit': 262144,
	}
	print "Reached here Bench: 1"
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


