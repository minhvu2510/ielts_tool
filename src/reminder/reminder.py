# -*- coding: utf-8 -*-
import requests
id_token = 'bot747492265:AAGhdNlip9nJFAthgIvokB6poI3ZRow63sI'
chat_id = '533599626'
message = ''
url = 'https://api.telegram.org/bot747492265:AAGhdNlip9nJFAthgIvokB6poI3ZRow63sI/sendMessage'
def send_key():
    message = 'Dịch part 7 + nghe'
    param = {'chat_id': chat_id, 'text': message}
    r = requests.get(url, params=param)
    print('minhvu')
if __name__ == "__main__":
    send_key()
