import time
import schedule
import pymongo
import requests
import telegram
from telegram.ext import Updater
import random

mongo_host = "localhost"
mongo_port = 27017
mongo_database = "ielts"
mongo_collection = "ipaeng"

telegram_token = "2020228985:AAGfr5kC_d2OXOSRallWj27wPyviFBpF-SE"
telegram_chat_id = "533599626"

client = pymongo.MongoClient(mongo_host, mongo_port)
db = client[mongo_database]
collection = db[mongo_collection]



def send_to_telegram(title, link):
    chat_id = '533599626'
    message = title + "-" + link
    url = 'https://api.telegram.org/bot2020228985:AAGfr5kC_d2OXOSRallWj27wPyviFBpF-SE/sendMessage'
    param = {'chat_id': chat_id, 'text': message}
    r = requests.get(url, params=param)

# Đọc dữ liệu từ MongoDB và gửi lên Telegram


def send_data_to_telegram():
    mess = ""
    for document in collection.find():
        title = document.get('ipa', '')
        link = document.get('spell', '')
        send_to_telegram(title, link)

def send_vocab_to_telegram(numOfWords):
    topic_collection = "ignore_topics"
    topics = db[topic_collection]
    limitPerTopic = numOfWords // topics.count()
    checkLenTopic = False
    random_numbers = list(range(topics.count() + 1))
    if (limitPerTopic == 0):
      random_numbers = random.sample(range(topics.count() + 1), min(12, topics.count() + 1))
      checkLenTopic = True
    index = 0
    result = []
    for topic in topics.find():
        wordsDb = []
        if index in random_numbers:
          if checkLenTopic:
            pipeline = [
              {"$match": {"level": {"$gt": 10}}},
              {"$sample": {"size": 1}}  # Số 12 ở đây là số lượng documents bạn muốn lấy ngẫu nhiên
            ]

            wordsDb = db[topic['topic'].lower()].aggregate(pipeline)
          else:
            pipeline = [
              {"$match": {"level": {"$gt": 10}}},
              {"$sample": {"size": limitPerTopic}}  # Số 12 ở đây là số lượng documents bạn muốn lấy ngẫu nhiên
            ]

            wordsDb = db[topic['topic'].lower()].aggregate(pipeline)
        index += 1
        result.extend(wordsDb)
    print(result)
    print(len(result))
    listWords = ""
    listValues = ""
    i = 1
    for re in result:
      key = str(i) + " " + re["key"] + " : " + str(re["phonetic"]) + " - " + re["audio"] + " \n "
      values = str(i) + " " + re["value"] + " \n "
      listWords += key
      listValues += values
      i += 1
    listValues += "------------"
    send_to_telegram(listWords, "")
    time.sleep(600)
    send_to_telegram(listValues, "")

schedule.every().day.at("08:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("09:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("10:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("11:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("12:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("14:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("15:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("16:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("17:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("18:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("19:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("20:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("21:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("22:00").do(lambda: send_vocab_to_telegram(12))
schedule.every().day.at("22:50").do(lambda: send_vocab_to_telegram(12))

while True:
  schedule.run_pending()
  time.sleep(1)
# if __name__ == "__main__":
#     # send_data_to_telegram()
#     send_vocab_to_telegram(12)
#     while True:
#       schedule.run_pending()
#       time.sleep(1)
    # chat_id = '533599626'
    # message = 'aaaa'
    # url = 'https://api.telegram.org/bot6577051681:AAFPceXpANLqeDFrrr5ASIF9yN2caluUAhI/sendMessage'
    # param = {'chat_id': chat_id, 'text': message}
    # r = requests.get(url, params=param)
    # print('minhvu')
