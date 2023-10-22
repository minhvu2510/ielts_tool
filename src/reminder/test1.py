import telebot
from functools import partial

TOKEN = '6635286290:AAEsJwPpIbYmvpFRqrYju4qouCgfE8EjWHM'

bot = telebot.TeleBot(TOKEN)
def start(message, link):
  bot.send_message(message.chat.id, f"Đây là liên kết của tôi: {link}")

def another_function():
  message = "Tin nhắn của bạn"
  link = "https://example.com"
  start_with_link = partial(start, link=link)
  start_with_link(message)
def main():
  bot.polling(none_stop=True)


if __name__ == '__main__':
  main()
