#! coding: utf-8
# code by vunm
import os
import sys
import json
from uuid import uuid4
from flask_cors import CORS
from random import randrange
from functools import wraps
import db
import utils
import img_topic
import random
from datetime import date, timedelta, datetime
from bson import ObjectId
from bson.json_util import dumps as dumps_json
from flask import (Flask, request, Blueprint, url_for,
                   send_from_directory, Response,
                   render_template, redirect, session, g, jsonify)
reload(sys)
sys.setdefaultencoding('utf-8')
# sys.path.append('../')
app = Flask(__name__)
app.config.from_object(__name__)
CORS(app)
class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv
@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        g.status = False
        if not token:
            message = {"status": False, "message": "Require token."}
            raise InvalidUsage(message, status_code=401)
        if token:
            user_info = db.get_document("user", {"token": token}).get("data")
            if user_info:
                user_info = user_info[0]
                user_info.pop("token")
                g.token = token
                g.user = user_info
                g.status = True
        if not g.status:
            message = {"status": False, "message": "Unknown token."}
            raise InvalidUsage(message, status_code=406)
        return f(*args, **kwargs)
    return decorated_function
@app.route('/login', methods=["POST"])
def login():
    if request.method == 'POST':
        data= json.loads(request.data)
        mess = utils.check_require(['name','pass'],data)
        if mess['status']:
            name = data.get('name')
            passw = data.get('pass')
            user = db.get_document('user', {'name': name,'pass':passw}).get("data")
            if user:
                token = str(uuid4())
                message = db.update_document("user", {"name": name}, {"token": token})
                date_old = datetime.strptime(user[0]['dateLog'], '%Y-%m-%d')
                date_new = datetime.strptime(str(datetime.now().date()), '%Y-%m-%d')
                day = (date_new - date_old).days
                if (day > 1):
                    info = {
                        'innings': int(user[0]['innings']) + 1,
                        'dateLog': str(datetime.now().date()),
                        'NotDone': int(user[0]['NotDone']) + 1
                    }
                else:
                    info = {
                        'innings': int(user[0]['innings']) + 1,
                        'dateLog': str(datetime.now().date())
                    }
                db.update_document('user', {'name': user[0]['name']}, info)
                if message:
                    messange = {'status': True,'token':token}
                else:
                    messange = {'status': False}
            else:
                messange = {'status': False}
    return dumps_json(messange)
@app.route('/', methods=["GET"])
def welcome():
    messange = {'status': True, 'mess': 'Welcome'}
    return dumps_json(messange)
@app.route('/user', methods=["GET"])
def getInfo():
    if request.method == "GET":
        token = request.headers.get('Authorization')
        user = db.get_document('user', {'token': token}).get("data")
        if user:
            return dumps_json({'status': True,'name': user[0]['name'],'innings':user[0]['innings'],'incomplete':user[0]['NotDone']})
    return dumps_json({'status': False})
@app.route('/test', methods=["POST","GET"])
# @login_required
def test():
    if request.method == "GET":
      pass
    else:
        data = json.loads(request.data)
    return 'minhvu'
@app.route('/preview', methods=["POST","GET","PUT","DELETE"])
def topic():
    if request.method == "GET":
        table = request.args.get('table')
        table = str(table).lower().replace(' ','_')
        level = int(request.args.get('level'))
        list_ext_id = db.get_document(table, {'level': {'$gt':level}}).get("data")
        conunt = len(list_ext_id)

        info_response = {
            "status": True,
            "total": conunt,
            "data": list_ext_id
        }
    if request.method == "POST":
        data = json.loads(request.data)
        table = data.get('table')
        table = str(table).lower().replace(' ', '_')
        info = {
            "key": data.get('key'),
            "value": data.get('value'),
            "level": int(data.get('level'))
        }
        if(len(str(data.get('key')))<1 or len(str(data.get('value')))<1):
            info_response = {"status": False, "message": "key or value is null"}
        else:
            info_response = db.insert_document(table,info,"key")
    if request.method == "PUT":
        data = json.loads(request.data)
        table = data.get('table')
        table1 = (data.get('_id'))
        table = str(table).lower().replace(' ', '_')
        info = {
            "key": data.get('key'),
            "value": data.get('value'),
            "level": int(data.get('level'))
        }
        if (len(str(data.get('key'))) < 1 or len(str(data.get('value'))) < 1):
            info_response = {"status": False, "message": "key or value is null"}
        else:
            info_response = db.update_document(table,{'_id':ObjectId(table1)},info)
    if request.method == "DELETE":
        data = json.loads(request.data)
        table = data.get('table')
        table1 = (data.get('_id'))
        table = str(table).lower().replace(' ', '_')
        info_response = db.delete_document(table, {'_id': ObjectId(table1)})
    return dumps_json(info_response)
@app.route('/note', methods=["POST","GET"])
def note():
    if request.method == "GET":
        list_ext_id = db.get_all('note').get("data")
        info_response = {
            "status": True,
            "data": list_ext_id
        }
        return dumps_json(info_response)
    if request.method == 'POST':
        data = json.loads(request.data)
        if (len(str(data.get('note'))) < 1):
            info_response = {
                "status": False,
                "message": 'Complete text'
            }
        else:
            info = {
                'note':data.get('note'),
                'level':data.get('level')
            }
            info_response = db.insert_document('note', info, "note")
        return dumps_json(info_response)
    return dumps_json({'status':False})
@app.route('/showexample', methods=["POST","GET","PUT","DELETE"])
def showexample():
    k=[]
    list_data=[]
    if request.method == "GET":
        k=db.show_allcolection()
        for i in k:
            len_col = db.count_document(i)
            ramdum = randrange(len_col)
            if(len_col < 13):
                list_ext_id = db.get_document(i, {'level': {'$gt': 5}}).get("data")
            else:
                list_ext_id = db.get_records_top(i,"level",1,(len_col - 12)).get("data")
            dict = {}
            dict['table'] = i
            dict['data'] = list_ext_id
            list_data.append(dict)
    if request.method == 'POST':
        data = json.loads(request.data)
        key = data.get('key')
        table = data.get('table')
        table = str(table).lower().replace(' ', '_')
        info_response = db.update_document(table,{'key':key},{'level': 15})
        return dumps_json(info_response)
    return dumps_json(list_data)
@app.route('/extension', methods=["POST","GET","PUT","DELETE"])
@login_required
def extension():
    if request.method == "GET":
        a = request.args.get('start')
        k = db.show_allcolection()
        total = 0
        expert = 0
        vague = 0
        forget = 0
        for i in k:
            if(i != 'extention'):
                total += db.count_document(i)
                expert += db.count_document(i,{'level':{'$lt': 10}})
                vague += db.count_document(i,{'$and' :[{'level':{'$gt': 9}},{'level':{'$lt': 13}}]})
                forget += db.count_document(i,{'level':{'$gt': 12}})
        # list_ext_id = db.get_records_top('extention', "level", 1, 1).get("data")
        list_ext_id = db.get_document('extention', {'level':{'$gt':9}}).get("data")
        info_response = {'total':total,'expert':expert,'vague':vague,'forget':forget,'data':list_ext_id}
    if request.method == "POST":
        data = json.loads(request.data)
        k = db.show_allcolection()
        ramdum = randrange(len(k))
        if(k[ramdum] == 'extention'):
            ramdum = ramdum +1
        info = {
            "key": data.get('key'),
            "value": data.get('value'),
            "level": int(data.get('level')),
            "creat_day": data.get('creat_day')
        }
        if (len(str(data.get('key'))) < 1 or len(str(data.get('value'))) < 1):
            info_response = {"status": False, "message": "key or value is null"}
        else:
            info_response12 = db.insert_document(k[ramdum], info, "key")
            info_response = db.insert_document('extention', info, "key")
    return dumps_json(info_response)
@app.route('/confuse', methods=["POST","GET"])
def confuse():
    if request.method == 'GET':
        a = request.args.get('level')
        k = db.show_allcolection()
        list_result = []
        for i in k:
            if (i != 'user') and (i != 'note'):
                list_ext_id = db.get_limit(i, {'level': {'$gt': int(a)}},44).get("data")
                if list_ext_id:
                    for j in list_ext_id:
                        list_result.append(j)
        info_response = {
            "status": True,
            "data": list_result
        }
        return dumps_json(info_response)
    else:
        return dumps_json({'status':False})
@app.route('/topics', methods=["POST","GET","PUT","DELETE"])
def topics():
    if request.method == 'GET':
        topics = db.get_all_topic()
        newlist = sorted(topics, key=lambda k: k['order'])
        for it in newlist:
            it['word'] = []
            it['link'] = img_topic.img[random.randint(0, len(img_topic.img) - 1)]
        # newl = [it.update( {"word":[]}) for it in newlist]
        info_response = {
            "status": True,
            "data": newlist
        }
        return dumps_json(info_response)
    if request.method == 'POST':
        data = json.loads(request.data)
        # 'idi': 'expand01', 'topic': 'expand01', 'level': 12, 'favorite': 0
        info = {
            "idi": data.get('idi'),
            "topic": data.get('topic'),
            "level": int(data.get('level')),
            "favorite": int(data.get('favorite')),
            "order": db.count_document('ignor_topics', {})
        }
        info_response = db.insert_document('ignor_topics', info, 'topic')
        print(info_response)
        return dumps_json(info_response)
    if request.method == 'PUT':
        data = json.loads(request.data)
        # 'idi': 'expand01', 'topic': 'expand01', 'level': 12, 'favorite': 0
        idi = data.get('idi')
        info = {
            "topic": data.get('topic'),
            "level": int(data.get('level')),
            "favorite": int(data.get('favorite')),
            "order": int(data.get('order'))
        }
        info_response = db.update_document('ignor_topics', {'idi': idi}, info)
        return dumps_json(info_response)
        # m = db.insert_document('igno_topics', info, 'topic')
    if request.method == 'DELETE':
        print('-----------------')
        data = json.loads(request.data)
        # 'idi': 'expand01', 'topic': 'expand01', 'level': 12, 'favorite': 0
        idi = data.get('idi')
        print('--------', idi)
        info_response = db.delete_document('ignor_topics', {'idi': idi})
        return dumps_json(info_response)
    else:
        return dumps_json({'status':False})
@app.route('/difficult', methods=["POST","GET","PUT","DELETE"])
def difficlut():
    if request.method == 'GET':
        # db.write_tempt()
        words = db.get_document('tempt', {}).get("data")
        info_response = {
            "status": True,
            "data": words
        }
        return dumps_json(info_response)
    if request.method == 'POST':
        print('-----------------------')
        print(request.data)
        data = json.loads(request.data)
        # 'idi': 'expand01', 'topic': 'expand01', 'level': 12, 'favorite': 0
        confirm = data.get('confirm'),
        db.delete_document('tempt',{})
        db.write_tempt()
        info_response = {'status': True}
        return dumps_json(info_response)
    else:
        return dumps_json({'status':False})
if __name__ == '__main__':
  try:
    port = int(sys.argv[1])
  except (TypeError, IndexError):
    port = 8100
  app.run(debug=True, host='0.0.0.0', port=port)
