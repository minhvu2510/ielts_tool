#! coding: utf-8
# code by vunm
import sys
# sys.path.append('../')
from pymongo import MongoClient
from random import randrange,sample

client = MongoClient('mongodb://localhost', 27017)
DATABASE = client.mvp
res = DATABASE['ignor_topics'].find({})
for i in res:
  print(i)
# res = filter(lambda r: r != '',res)
# print(list(res))
print(DATABASE)
print(res)
