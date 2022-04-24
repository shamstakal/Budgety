from django.shortcuts import render
from django.http import JsonResponse

from django.core import serializers
from index.models import Budget

import json


def index(request):
    incomes = Budget.objects.filter(typ='+')
    outcomes = Budget.objects.filter(typ='-')
    context = {'incomes': incomes, 'outcomes': outcomes}
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
        newbudget=serializers.serialize('json',[newbudget])
    return JsonResponse(newbudget, safe=False)


def deleteBudget(request):
    budg_id=json.loads(request.body)['budg_id']
    budget=Budget.objects.get(id=budg_id)
    budget.delete()
    resp={'msg':'Successfully Deleted'};
    return JsonResponse(resp,safe=False)
