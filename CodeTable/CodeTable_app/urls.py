from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^runCode/', views.runCode, name='runCode'),
    url(r'^(?P<file_id>\w{10})/$', views.detail, name='detail'),
    url(r'^saveCode/', views.saveCode, name='saveCode'),
    url(r'^compileCode/', views.compileCode, name='compileCode'),
    
]
