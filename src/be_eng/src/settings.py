#!/usr/bin/python
# -*- coding: utf8 -*-
# vunm

import os


MONGO_HOST = os.getenv('MONGO_HOST', 'mongodb')
MONGO_PORT = os.getenv('MONGO_CLIENT', 27017)
MONGO_DATABASE = os.getenv('MONGO_DATABASE', 'mvp')
TOKEN  = os.getenv('TOKEN', '834857847:AAH-_g84YhfoYW5Oc60Kaaaaaaaaaa')
