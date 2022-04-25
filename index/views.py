from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core import serializers
from index.models import Budget, Customer

import json

from index.valid import budgetValidator


def index(request):
    user = request.user
    context = {}

    if request.user.is_authenticated:

        try:
            customer = Customer.objects.get(user=user)
            incomes = Budget.objects.filter(typ='+', customer=customer)
            outcomes = Budget.objects.filter(typ='-', customer=customer)
            context = {
                'inc_val': customer.inc_val,
                'out_val': customer.out_val,
                'total_val': customer.inc_val-customer.out_val,
                'incomes': incomes,
                'outcomes': outcomes, }
        except Exception as e:
            print(e)

    return render(request, 'index.html', context)


def addBudget(request):
    user = request.user

    if user.is_authenticated:
        data = json.loads(request.body)
        result = budgetValidator(data)
        new_val = (data['value'])
        desc = data['desc']
        typ = data['type']
        customer = Customer.objects.get(user=request.user)

        if result['error']:
            return JsonResponse(result['resp'], safe=False)
        else:
            newbudget = Budget.objects.create(
                value=int(new_val), desc=desc, typ=typ, customer=customer)

            if (typ == '+'):
                customer.inc_val = customer.inc_val + int(new_val)
            else:
                customer.out_val = customer.out_val + int(new_val)

            newbudget.save()
            customer.save()

            newbudget = serializers.serialize('json', [newbudget])
            return JsonResponse([newbudget], safe=False)
    else:
        resp = {'error': True, 'msg': 'You Have To Be Logged In'}
        return JsonResponse(resp, safe=False)


def deleteBudget(request):
    if request.user.is_authenticated:
        resp={}
        try:

            budg_id = json.loads(request.body)['budg_id']
            customer = Customer.objects.get(user=request.user)
            budget = Budget.objects.get(id=budg_id, customer=customer)
            budget.delete()
            resp['msg'] = 'Successfully Deleted'
            return JsonResponse(resp, safe=False)

        except Exception as e:
            resp['msg'] = 'Something Went Wrong'
            return JsonResponse(resp, safe=False)
    
    resp['msg'] = 'Please Login First'
    return JsonResponse(resp, safe=False)


def signup(request):
    if request.user.is_authenticated:
        auth.logout(request)

    if request.method == 'POST':
        data = json.loads(request.body)

        # CHECK PASSWORD SHOULD BE MATCHED
        if(data['password'] != data['r_password']):
            resp = {'error': True, 'msg': 'Password Does not match'}
            return JsonResponse(resp, safe=False)

        # TO CHECK FOR EMPTY FIELDS
        for key, val in data.items():
            if val == '':
                resp = {'key': key, 'error': True}
                return JsonResponse(resp, safe=False)

        try:
            user = User.objects.create_user(
                first_name=data['full_name'],
                username=data['username'],
                password=data['password'])
            customer = Customer.objects.create(inc_val=0, out_val=0, user=user)
            customer.save()
            user.save()

            auth.login(request, user)

            resp = {'error': False, 'msg': 'Sign Up Successfully'}
            return JsonResponse(resp, safe=False)

        except:
            resp = {'error': True, 'msg': 'Try Again'}
            return JsonResponse(resp, safe=False)

    else:
        return render(request, 'signup.html')


def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = auth.authenticate(
            request, username=data['username'], password=data['password'])

        if user is not None:
            auth.login(request, user)
            resp = {'error': False, 'msg': 'Logged in'}
            return JsonResponse(resp, safe=False)
        else:
            resp = {'error': True, 'msg': 'Please Try Again!'}
            return JsonResponse(resp, safe=False)
    else:
        return render(request, 'login.html')


def logout_(request):
    auth.logout(request)
    return redirect('/')
