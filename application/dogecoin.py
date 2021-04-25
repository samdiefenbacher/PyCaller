from tradinhood import Robinhood
from decimal import Decimal
import random
import time
import eel

rbh = Robinhood()
rbh.login(username="samdief1@gmail.com", password="Zaxryz-0qotro-tacjug")
rbh.save_login()
rbh.load_login("./robinhood-login")
dogecoin = rbh['DOGE']
initDogePrice = dogecoin.price

def initweb():
    eel.init('web')
    eel.start('index.html')

@eel.expose
def get_doge_price():
    return str(dogecoin.price)

@eel.expose
def get_doge_total():
    return rbh.holdings

@eel.expose
def get_doge_buying_power():
    return str(rbh.buying_power)

@eel.expose
def get_position_history():
    return rbh.holdings

#eel.buy()(rbh.buy(dogecoin, quantity=1))

#eel.sell()(rbh.sell(dogecoin, quantity=1))

def main():
    initweb()



main()


