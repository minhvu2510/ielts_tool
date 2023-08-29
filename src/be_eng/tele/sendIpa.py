import pymongo
import requests
import telegram
from telegram.ext import Updater

mongo_host = "localhost"
mongo_port = 27017
mongo_database = "ielts"
mongo_collection = "ipaeng"

telegram_token = "6577051681:AAFPceXpANLqeDFrrr5ASIF9yN2caluUAhI"
telegram_chat_id = "533599626"

# Kết nối tới MongoDB
client = pymongo.MongoClient(mongo_host, mongo_port)
db = client[mongo_database]
collection = db[mongo_collection]

# Hàm để gửi thông điệp đến Telegram


def send_to_telegram(title, link):
    chat_id = '533599626'
    message = title + "-" + link
    url = 'https://api.telegram.org/bot6577051681:AAFPceXpANLqeDFrrr5ASIF9yN2caluUAhI/sendMessage'
    param = {'chat_id': chat_id, 'text': message}
    r = requests.get(url, params=param)

# Đọc dữ liệu từ MongoDB và gửi lên Telegram


def send_data_to_telegram():
    mess = ""
    for document in collection.find():
        title = document.get('ipa', '')
        link = document.get('spell', '')
        send_to_telegram(title, link)


if __name__ == "__main__":
    send_data_to_telegram()
    # chat_id = '533599626'
    # message = 'aaaa'
    # url = 'https://api.telegram.org/bot6577051681:AAFPceXpANLqeDFrrr5ASIF9yN2caluUAhI/sendMessage'
    # param = {'chat_id': chat_id, 'text': message}
    # r = requests.get(url, params=param)
    # print('minhvu')
