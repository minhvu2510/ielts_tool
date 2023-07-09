#! coding: utf-8
# code by vunm
import sys
# sys.path.append('../')
from pymongo import MongoClient
import settings
from random import randrange,sample

client = MongoClient(settings.MONGO_HOST, settings.MONGO_PORT)
DATABASE = client.mvp
def get_document(table,query,order=None,distinct=None,page=None,limit=None,incre=-1):
    if page:
        if not limit:
            limit = 20
        page = int(page)
        limit = int(limit)
        if order:
            res = DATABASE[table].find(query).sort(order, incre).skip((page-1)*limit).limit(limit)
        else:
            res = DATABASE[table].find(query).skip((page-1)*limit).limit(limit)
    else:
        if order:
            res = DATABASE[table].find(query).sort(order, incre)
        else:
            res = DATABASE[table].find(query)
    if distinct:
        res = res.distinct(distinct)
        res = filter(lambda r: r != '',res)
    if res:
        message = {"data": list(res)}
    else:
        message = {"data": []}
    return  message
def get_limit(table,query,limit):
    res = DATABASE[table].find(query).limit(limit)
    if res:
        message = {"data": list(res)}
    else:
        message = {"data": []}
    return  message
def get_all(table):
    res = DATABASE[table].find()
    res = filter(lambda r: r != '', res)
    if res:
        message = {"data": list(res)}
    else:
        message = {"data": []}
    return  message
def get_sort(table,order,incre):
    res = DATABASE[table].find().sort(order,incre)
    res = filter(lambda r: r != '', res)
    if res:
        message = {"data": list(res)}
    else:
        message = {"data": []}
    return message
def get_records_top(table,order,incre,skip):
    res = DATABASE[table].find().sort(order, incre).skip(skip)
    # res = DATABASE[table].find().sort(order, incre).limit(skip)
    res = filter(lambda r: r != '', res)
    if res:
        message = {"data": list(res)}
    else:
        message = {"data": []}
    return message
def find_one(table,order,incre,skip):
    res = DATABASE[table].find_one().skip(skip)
    res = filter(lambda r: r != '', res)
    if res:
        message = {"data": list(res)}
    else:
        message = {"data": []}
    return message
def insert_document(table, query, file_unique=None):
    if file_unique:
        DATABASE[table].create_index(file_unique,unique = True)
    try:
        DATABASE[table].insert(query)
        message = {"status": True, "message": "Insert success"}
        if "id" in query:
            message.update({"id": query["id"]})
    except:
        message = {"status": False, "message": "{} is exists.".format(file_unique)}
    return message
def update_document(table, query, query_update):
    try:
        DATABASE[table].update(query, {"$set": query_update}, multi=True)
        message = {"status": True, "message": "Update success"}
    except:
        message = {"status": False, "message": "Update error"}
    return message
def delete_document(table, query):
    try:
        DATABASE[table].remove(query)
        message = {"status": True, "message": "Delete success"}
    except:
        message = {"status": False, "message": "Delete error"}
    return message


def count_document(table, query=None):
    if query:
        return DATABASE[table].find(query).count()
    else:
        return DATABASE[table].count()
def show_allcolection():
    allcolec = []
    for i in DATABASE.collection_names():
        allcolec.append(i)
    return allcolec
def get_all_record(table,query):
    res = DATABASE[table].find(query)
    return list(res)

def get_all_topic():
    topics = get_all_record('ignor_topics', {})
    ignore = ['none', 'user', 'ig_topics', 'igr_topics', 'igno_topics', 'note','tempt']
    result = [topic for topic in topics if topic['topic'] not in ignore]
    return result

def get_difficult():
    priority = get_all_record('ignor_topics', {'favorite': 1})
    list_name_priority = list(map(lambda x: x['topic'], priority))
    print(list_name_priority, type(list_name_priority))
    length_tb = count_document('ignor_topics')
    hight_lv = sample(range(length_tb - 14, length_tb-4), 6)   # lấy random 5 topic trong 10 topic
    print(hight_lv)
    list_topics_hightlv = get_document('ignor_topics', {'order': {'$in': hight_lv}}).get("data")
    list_name_topics_highlv = list(map(lambda x: x['topic'], list_topics_hightlv))
    print(list_name_topics_highlv)
    medi_lv = sample(range(1, length_tb-14), 11)
    print(medi_lv)
    list_topics_medilv = get_document('ignor_topics', {'order': {'$in': medi_lv}}).get("data")
    list_name_topics_medilv = list(map(lambda x: x['topic'], list_topics_medilv))
    print(list_name_topics_medilv)
    hight_topics = list(set(list_name_priority + list_name_topics_highlv))
    result = []
    for topic in hight_topics:
        coun = count_document(topic, {'level': {'$gt': 8}})
        ram_skip = randrange(coun)
        list_ext_id = get_records_top(topic, "level", 1, ram_skip).get("data")
        print(list_ext_id)
        result.extend(list_ext_id[0:7])
    print(len(result))
    for topic in list_name_topics_medilv:
        coun = count_document(topic, {'level': {'$gt': 8}})
        ram_skip = randrange(coun)
        list_ext_id = get_records_top(topic, "level", 1, ram_skip).get("data")
        print(list_ext_id)
        result.extend(list_ext_id[0:4])
    return result
def write_tempt():
    try:
        result = get_difficult()
        for word in result:
            info = {
                "key": word['key'],
                "value": word['value'],
                "level": int(word['level'])
            }
            insert_document('tempt', info, "key")
        return True
    except:
        return False

if __name__ == '__main__':
    print(get_difficult())
