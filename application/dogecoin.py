from tradinhood import Robinhood
import tradinhood.endpoints as URL
from tradinhood.util import *
from tradinhood.errors import *
from tradinhood.models import *
from decimal import Decimal
import random
import time
import eel

rbh = Robinhood()

rbh.login(username="samdief1@gmail.com", password="Zaxryz-0qotro-tacjug")
rbh.save_login()
rbh.load_login("./robinhood-login")
dogecoin = rbh['DOGE']

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
def get_holdings_history():
    return query_crypto_orders(rbh)

@eel.expose
def buy(amt):
    rbh.buy(dogecoin, quantity=amt)

@eel.expose
def sell(amt):
    rbh.sell(dogecoin, quantity=amt)

def query_crypto_orders(
        rbh,
        sort_by_time=True,
        pages=3,
        lookup_assets=True,
        state=None,
    ):
        """Search orders"""
        orders = []
        json_crypto = rbh._get_pagination(URL.Nummus.orders, pages=pages)
        orders += [
            Order(rbh, json_data, "cryptocurrency", lookup_asset=lookup_assets) for json_data in json_crypto
        ]
        if state is not None:
            orders = [order for order in orders if order.json["state"] == state]
        if sort_by_time:
            orders.sort(key=lambda o: o.created_at, reverse=True)
        return json_crypto


initweb()



