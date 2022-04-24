from django.urls import path
from index import views

app_name='index'

urlpatterns=[
    path('', views.index, name='index'),
    path('add-budget/', views.addBudget, name='add-budget'),
    path('delete-budget/', views.deleteBudget, name='delete-budget')
]

