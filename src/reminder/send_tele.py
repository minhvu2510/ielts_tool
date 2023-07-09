# -*- coding: utf-8 -*-
import requests
chat_id = '533599626'
message = ''
url = 'https://api.telegram.org/bot747498888:AAGhdNlip9nJFAthgIvokB6poI3ZRowaaaa/sendMessage'
def send_key(file):
    message = ''
    with open(file, "r+") as t2:
        for i in t2:
            message = message + i
            # print(i,type(i))
    print(message)
    param = {'chat_id': chat_id, 'text': message}
    r = requests.get(url, params=param)
    print('minhvu')
if __name__ == "__main__":
    import sys
    send_key(str(sys.argv[1]))
# bot.send_photo(chat_id=chat_id, photo=open('tests/test.png', 'rb'))
