#! coding: utf-8

import db
from random import randrange,sample

list_topic = ['Contracts','extention', 'Marketing', 'Warranties', 'Business Planning', 'Conferences', 'Computers',
              'Office Technology', 'Office Procedures', 'Electronics', 'Correspondence', 'Job Advertising Recruiting',
              'Applying and Interviewing', 'Hiring and Training', 'Salaries and Benefits', 'Promotions,Pensions,Awards', 'Shopping', 'Ordering Supplies',
              'Shipping', 'Invoices', 'Inventory', 'Other', 'Forget', 'Expand01', 'Expand02', 'Expand part7', 'Appendix', 'mv', 'Javis',
              'Part1', 'Advance', 'Essential', 'Pro', '33', '34', '35', '36', 'ets2018_1', 'ets2018_2', 'ets2018_3', 'ets2018_4','ets2018_5', 'ets2018_6','ets2018_7','ets2018_8']
for item in list_topic:
    list_topic[list_topic.index(item)] = item.lower().replace(' ', '_')
k=db.show_allcolection()
k.remove('note')
k.remove('user')
k.remove('none')
print(len(k), len(list_topic))
for i in k:
    if i not in list_topic:
        pass
print(len(k))
topic_old = sample(range(0,len(k) - 10),2)
print(topic_old)
new_topic = sample(range(len(k)-10,len(k)),10)
print(new_topic)
ram = topic_old + new_topic
coun = db.count_document('ets2018_2', {'level': {'$gt': 1}})
list_data = []
for i in ram:
    if (list_topic[i] != 'user') and (list_topic[i] != 'note'):
        coun = db.count_document(list_topic[i], {'level': {'$gt': 8}})
        if coun > 0:
            ram_skip = randrange(coun)
            list_ext_id = db.get_records_top(list_topic[i], "level", 1, ram_skip).get("data")
            print(list_ext_id[0])
            list_data.append(list_ext_id[0])
        else:
            continue
print(len(list_data), '----------')
file = open("/srv/dashboard_eng/src/reminder/key.txt", "wb+")
file1 = open("/srv/dashboard_eng/src/reminder/value.txt", "wb+")
count = 1
for i in list_data:
    file.write(str(count) + ' ' + i['key'].encode('utf-8') + '\n')
    count = count + 1
count = 1
for i in list_data:
    file1.write(str(count) + ' ' + i['value'].encode('utf-8') + '\n')
    count = count + 1
