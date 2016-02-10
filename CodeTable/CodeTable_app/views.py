from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from . import languages
import requests
import json
import string
import random
from datetime import datetime
from django.core.signing import Signer
from .models import Code, Session
from django.shortcuts import redirect

# Note : Cross-check for the randomly generate string that it's not already used

RUN_URL = u'https://api.hackerearth.com/v3/code/run/'
COMPILE_URL = u'https://api.hackerearth.com/v3/code/compile/'
CLIENT_SECRET = '9b6d81acf7b7c1d91d0dddbdbe1cb6de1c7bc7fe'



def index(request):
	N = 10

	file_name = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(N))
	file_url = '/CodeTable_app/' + file_name + '/'
	signer = Signer()
	value = signer.sign(file_name)
	print 'Result : ',value, file_name

	response = HttpResponseRedirect(file_url)

	c = Code(code_id = file_name, last_edited = datetime.now(), code_actual = "")
	c.save()

	if 'key' in request.COOKIES:
		key = request.COOKIES.get('key')
		print 'yay'

	else:
		key =''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
		response.set_cookie('key', key)
		print 'no'

	allowed_key = [key]
	session = Session(code_id = file_name)
	# print b.setlist(allowed_key), json.dumps(allowed_key), b.allowed_list, str(allowed_key)
	session.setlist(allowed_key)
	session.save()

	# X = Session.objects.get(code_id = file_name)
	# Y = json.loads(X.allowed_list)
	# Y.append('Aman')
	# print 'Allowed Key: ', Y
	return response


def detail(request, file_id):
	languages.lang['code_id'] = file_id

	if 'key' not in request.COOKIES:
		# CHeck Code existence
		languages.lang['Info']['auth'] = False
		languages.lang['Info']['code_id'] = file_id
		print 'Unauthorize Access'

	else:
		key = request.COOKIES['key']
		session = Session.objects.get(code_id = file_id)
		allowed_keys = json.loads(session.allowed_list)
		print "X - ", allowed_keys, key

		# if key not in allowed_key.getlist():
		if key in allowed_keys:
			languages.lang['Info']['auth'] = True
			print 'Access Granted\n'
		else:
			print "Unauthorize access"
			languages.lang['Info']['auth'] = False

	context = {'language': languages.lang}

	return render(request, 'CodeTable_app/index.html', {"obj_as_json": json.dumps(languages.lang)})

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
	source = request.GET.get('code', '') 
	code_id = request.GET.get('code_id', '') 
	print 'Source :- ', source, code_id
	allowed_key = Session.objects.filter(code_id = code_id)

	code = Code.objects.get(code_id = code_id)
	code.code_actual = source
	code.last_edited = datetime.now()
	code.save()
	return HttpResponse(datetime.now())



