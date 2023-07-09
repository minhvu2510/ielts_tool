import db

# def crontab():
#     day_start = date.today()
#     db.get_document('user',{'':''})
# mv = [{'key':'attend','value':'thamgia'},{'key':'eage','value':'thue'}]
# for i in mv:
#     if(i.get('key')=='attend'):
#         i['value'] = 1
#     print(i.get('value'))
from datetime import date, timedelta, datetime
print(datetime.now().timestamp())
# end = '2019-2-25'
# end2 = '2019-2-23'
list=['2019-2-25','2019-2-21','2019-2-23']
list1=[]
for i in list:
    day_end = datetime.strptime(i, '%Y-%m-%d')
    list1.append(day_end)
if((list1[0]>list1[1])):
    print(True)
else:
    print(False)
# print ((list1[0]-list1[1]).days,type(list1[0]))
youngest = max(list1)
# print(youngest.date())
# print(datetime.now().date(),type(datetime.now().date()))
# day_start = date.today()
# day_start = date.today() - timedelta(days=1)
# day_end = date(2019-2-25)
# start = date.strptime(day_end, '%Y-%m-%d')
# print(start,type(start))
# print (day_end,type(day_end),day_start - timedelta(days=1))