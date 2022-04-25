from django.urls import path
from index import views

app_name='index'

urlpatterns=[
    path('', views.index, name='index'),
    path('add-budget/', views.addBudget, name='add-budget'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout_, name='logout'),
    path('delete-budget/', views.deleteBudget, name='delete-budget')
]

