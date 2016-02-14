from __future__ import unicode_literals

from django.db import models
import json

# Create your models here.

class Code(models.Model):
	code_id = models.CharField(max_length=11, primary_key=True, unique=True)
	last_edited = models.DateTimeField(null=True)
	code_actual = models.CharField(max_length = 50000)
	run_count = models.IntegerField(default = 0)
	user_name = models.CharField(max_length=11, default = "")
	clone_count = models.IntegerField(default = 0)
	code_lang = models.CharField(max_length = 15, default = "C")
	def __unicode__(self):
		return self.code_id

class Session(models.Model):
	code_id = models.CharField(max_length = 11)
	allowed_list = models.CharField(max_length = 500)

	def setlist(self, x):
		self.allowed_list = json.dumps(x)
		return self.allowed_list
		# self.code = y

	def getlist(self):
		return json.loads(self.code_id)

	def __unicode__(self):
		return self.code_id