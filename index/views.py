from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core import serializers
from index.models import Budget, Customer

import json


def index(request):
    incomes = Budget.objects.filter(typ='+')
    outcomes = Budget.objects.filter(typ='-')

    context = {
        'incomes': incomes,
        'outcomes': outcomes}
    return render(request, 'index.html', context)


def addBudget(request):
    data = json.loads(request.body)
    resp = {}

    if data['value'] is None:
        resp = {'error': True, 'msg': 'Value Can\'t be less then zero.'}

    elif (len(data['desc']) <= 0):
        resp = {'error': True, 'msg': 'Description Can\'t be empty.'}
    else:
        newbudget = Budget.objects.create(
            value=data['value'], desc=data['desc'], typ=data['type'])
        newbudget.save()
        newbudget = serializers.serialize('json', [newbudget])
    return JsonResponse(newbudget, safe=False)


def deleteBudget(request):
    budg_id = json.loads(request.body)['budg_id']
    budget = Budget.objects.get(id=budg_id)
    budget.delete()
    resp = {'msg': 'Successfully Deleted'}
    return JsonResponse(resp, safe=False)


def signup(request):
    if request.user.is_authenticated:
        auth.logout(request)

    if request.method == 'POST':
        data = json.loads(request.body)


        # CHECK PASSWORD SHOULD BE MATCHED
        if(data['password'] != data['r_password']):
            print('deos')
            resp = {'error': True, 'msg': 'Password Does not match'}
            return JsonResponse(resp, safe=False)

        # TO CHECK FOR EMPTY FIELDS
        print(data)
        for key,val in data.items():
            if val =='':
                resp = {'key': key, 'error': True}
                return JsonResponse(resp, safe=False)

        try:
            user = User.objects.create(
                first_name=data['full_name'],
                username=data['username'],
                password=data['password'])
            user.save()
            customer = Customer.objects.create(
                inc_val=0, out_val=0, user=user
            )
            customer.save()
            auth.login(request, user)

        except:
            resp = {'error': True, 'msg': 'Try Again'}
            return JsonResponse(resp, safe=False)
 
        resp = {'error': False, 'msg': 'Sign Up Successfully'}
        return JsonResponse(resp, safe=False)
   
    else:
        return render(request, 'signup.html')


def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = auth.authenticate(
            username=data['username'], password=data['password'])
        if user is not None:
            auth.login(request, user)
            resp = {'error': False, 'msg': 'Logged in'}
            return JsonResponse(resp, safe=False)
        else:
            resp = {'error': False, 'msg': 'Please Try Again!'}
            return JsonResponse(resp, safe=False)
    else:
        return render(request, 'login.html')


def logout_(request):
    auth.logout(request)
    return redirect('/')
