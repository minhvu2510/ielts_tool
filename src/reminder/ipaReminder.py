import pymongo
import telegram
import requests
from telegram import InputMediaAudio
import asyncio
from functools import partial
# from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import random

from telegram.ext import Updater, CommandHandler, CallbackQueryHandler
import telebot
# Replace

host = 'localhost'  # Địa chỉ máy chủ MongoDB
port = 27017  # Cổng mặc định của MongoDB
database_name = 'ielts'  # Tên cơ sở dữ liệu
collection_name = 'ipaeng'  # Tên bảng bạn muốn đọc
client = pymongo.MongoClient(host, port)

value = 0
db = client[database_name]
collection = db[collection_name]
data = list(collection.find())
def getIpa():
  global data
  random_number = random.randint(0, 43)
  ipaNeed = data[random_number]
  typeIpaNeed = ipaNeed['type']
  sameType = []
  for document in data:
    if(typeIpaNeed == document['type']):
      sameType.append(document)

  print(sameType)
  return ipaNeed, sameType

async def sendTele(link):
  bot_token = '6635286290:AAEsJwPpIbYmvpFRqrYju4qouCgfE8EjWHM'

  # Tạo một đối tượng bot
  bot = telegram.Bot(token=bot_token)

  # Thay thế 'CHAT_ID' bằng ID của cuộc trò chuyện hoặc người nhận bạn muốn gửi tin nhắn
  chat_id = '533599626'

  # Tin nhắn văn bản
  text_message = 'Đây là một tệp âm thanh MP3:'
  mp3_url = link

  # Tạo một đối tượng InputMediaAudio với liên kết đến tệp âm thanh MP3
  audio_message = InputMediaAudio(media=mp3_url, caption=text_message, parse_mode="Markdown")

  # Gửi tin nhắn với tệp âm thanh MP3
  await bot.send_media_group(chat_id=chat_id, media=[audio_message])

def send_to_telegram(message):
  chat_id = '533599626'
  message = message
  url = 'https://api.telegram.org/bot6635286290:AAEsJwPpIbYmvpFRqrYju4qouCgfE8EjWHM/sendMessage'
  param = {'chat_id': chat_id, 'text': message}
  r = requests.get(url, params=param)

bot_token = '6635286290:AAEsJwPpIbYmvpFRqrYju4qouCgfE8EjWHM'
bot = telegram.Bot(bot_token)

TOKEN = "6635286290:AAEsJwPpIbYmvpFRqrYju4qouCgfE8EjWHM"
bot = telebot.TeleBot(TOKEN)

# Xử lý lệnh /start
@bot.message_handler(commands=['start'])
def start(message):
  keyboard = InlineKeyboardMarkup()
  button = InlineKeyboardButton("Ipa", callback_data='Ipa')
  button1 = InlineKeyboardButton("Chức năng 1", callback_data='button_pressed')
  button2 = InlineKeyboardButton("Chức năng 2", callback_data='button_pressed')
  button3 = InlineKeyboardButton("Chức năng 3", callback_data='button_pressed')
  button4 = InlineKeyboardButton("Chức năng 4", callback_data='button_pressed')
  keyboard.add(button, button1, button2, button3, button4)
  bot.send_message(message.chat.id, "Chọn chức năng muốn sử dụng:", reply_markup=keyboard)

  @bot.callback_query_handler(func=lambda call: call.data == 'button_pressed')
  def button_pressed(call):
    bot.answer_callback_query(call.id, "Nút bấm đã được bấm!")
    # Tạo một bàn phím nội dung cho nút bấm
    # keyboard = InlineKeyboardMarkup()
    # button = InlineKeyboardButton("Bấm vào đây", callback_data='button_pressed')
    # button1 = InlineKeyboardButton("Bấm vào đây 1", callback_data='button_pressed')
    # button2 = InlineKeyboardButton("Bấm vào đây 2", callback_data='button_pressed')
    # button3 = InlineKeyboardButton("Bấm vào đây 2", callback_data='button_pressed')
    # button4 = InlineKeyboardButton("Bấm vào đây 2", callback_data='button_pressed')
    # keyboard.add(button, button1, button2, button3, button4)
    #
    # # Gửi tin nhắn chứa nút bấm
    # mp3_url = "https://ps.drive.bfcplatform.vn/s/LQA3FnYNzbE83AN/download"
    #
    # # Tạo một đối tượng InputMediaAudio với liên kết đến tệp âm thanh MP3
    # audio_message = InputMediaAudio(media=mp3_url, caption="test", parse_mode="Markdown")
    # bot.send_message(message.chat.id, link, reply_markup=keyboard)
    # chat_id = '533599626'
    # bot.send_media_group(message.chat.id, media=[audio_message], reply_markup=keyboard)

# Xử lý khi nút bấm được bấm
@bot.callback_query_handler(func=lambda call: call.data == 'button_pressed')
def button_pressed(call):
    print(call.reply_markup)
    bot.answer_callback_query(call.id, "Nút bấm đã được bấm!")

@bot.callback_query_handler(func=lambda call: call.data == 'Ipa')
def ipa_pressed(call):
    ipaNeed, sameList = getIpa()
    mp3_url = ipaNeed['spell']
    global value
    value = ipaNeed['ipa']
    keyboard = create_keyboard(sameList, ipaNeed['ipa'])
    bot.send_audio("533599626", mp3_url,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", reply_markup=keyboard)

def create_keyboard(sameList, value):
    a = 'func_1'
    keyboard = InlineKeyboardMarkup()
    print(len(sameList))
    for seq in range(0,len(sameList),2):
      print("seq", seq)
      button1 = InlineKeyboardButton(sameList[seq]['ipa'], callback_data=sameList[seq]['ipa'])
      if seq != len(sameList) - 1:
        button2 = InlineKeyboardButton(sameList[seq + 1]['ipa'], callback_data=sameList[seq + 1]['ipa'])
        keyboard.add(button1, button2)
      else:
        keyboard.add(button1)
    continueButton = InlineKeyboardButton("Continue", callback_data="Ipa")
    keyboard.add(continueButton)

    # for ipa in sameList:
    #   button1 = InlineKeyboardButton(ipa['ipa'], callback_data=a)


      # keyboard.add(button1)
    # keyboard.add(button3, button4)

    return keyboard
@bot.callback_query_handler(func=lambda call: True)
def button_pressed(call):
    global value
    print(call.data)
    print(value)
    if call.data == value:
        bot.answer_callback_query(call.id, "Đúng cmnr")
    elif call.data == "1":
        # start(telebot.types.Message(message_id=call.message.message_id, chat=call.message.chat, text='/start'))
        ipa_pressed()
    else:
      bot.answer_callback_query(call.id, "Sai cmmr")


def custom_function_1(message):
  # Thực hiện chức năng 1 ở đây
  bot.answer_callback_query(message.chat.id, "Chức năng 1 đã được kích hoạt!")


def custom_function_2(message):
  # Thực hiện chức năng 2 ở đây
  bot.answer_callback_query(message.chat.id, "Chức năng 2 đã được kích hoạt!")


def custom_function_3(message):
  # Thực hiện chức năng 3 ở đây
  bot.answer_callback_query(message.chat.id, "Chức năng 3 đã được kích hoạt!")


def custom_function_4(message):
  # Thực hiện chức năng 4 ở đây
  bot.answer_callback_query(message.chat.id, "Chức năng 4 đã được kích hoạt!")


# Chạy bot
if __name__ == "__main__":
  # getIpa()
  bot.polling(none_stop=True)

    # getIpa()

