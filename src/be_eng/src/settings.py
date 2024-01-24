#!/usr/bin/python
# -*- coding: utf8 -*-
# vunm

import os


MONGO_HOST = os.getenv('MONGO_HOST', 'mongodb://mongo')
# MONGO_HOST = os.getenv('MONGO_HOST', 'mongodb://127.0.0.1:27017')
MONGO_PORT = os.getenv('MONGO_CLIENT', 27017)
MONGO_DATABASE = os.getenv('MONGO_DATABASE', 'ielts')
TOKEN = os.getenv('TOKEN', '834857847:AAH-_g84YhfoYW5Oc60Kaaaaaaaaaa')
