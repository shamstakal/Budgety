from django.shortcuts import render
from django.http import JsonResponse

from index.models import Budget

import json


def index(request):
    return render(request, 'index.html')


def addBudget(request):
    data = json.loads(request.body)
    resp = {}

    if data['value'] is None:
        resp = {'msg': 'Value Can\'t be less then zero.'}

    elif (len(data['desc']) <= 0):
        resp = {'msg': 'Description Can\'t be empty.'}
    else:
        newbudget = Budget.objects.create(
            value=data['value'], desc=data['desc'], typ=data['type'])

        newbudget.save()
        resp = {'msg': 'Added Successfully'}

    return JsonResponse(resp, safe=False)
