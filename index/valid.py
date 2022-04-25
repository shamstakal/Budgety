
def budgetValidator(data):

    if data['value'] =='':

        resp = {'error': True, 'msg': 'Value Can\'t be less then zero.'}
        return {'error': True, 'resp': resp}

    elif (len(data['desc']) <= 0):

        resp = {'error': True, 'msg': 'Description Can\'t be empty.'}
        return {'error': True, 'resp': resp}

    else:
        return {'error': False, "resp": {}}
