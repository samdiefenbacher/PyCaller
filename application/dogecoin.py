from tradinhood import Robinhood
from decimal import Decimal
import random
import time

rbh = Robinhood()

rbh.login(username="samdief1@gmail.com", password="Zaxryz-0qotro-tacjug")
rbh.save_login()
rbh.load_login("./robinhood-login")
dogecoin = rbh['DOGE']
initDogePrice = dogecoin.price

def menu():
    
    choice = 0
    while choice == 0:
        print("Select a menu option: ")
        print("(1) Auto Trade Dogecoin")
        print("(2) Manually Trade Dogecoin")
        print("(Q) Manually Trade Dogecoin")

        choice = input("Input menu number: ")
        if choice == "1":
            autotrade()
        elif choice == "2":
            print("choice 2")
        elif choice == "Q":
            print("Quitting out")
        else:
            print("Couldn't find menu option")
            choice = 0

def fetchstats():
    print("Current price: ",dogecoin.price)
    print("Current positions:",rbh.positions)

def autotrade():
    interrupt = 0
    while interrupt == 0:
        fetchstats()
        currentDogePrice = dogecoin.price
        if currentDogePrice > (initDogePrice + Decimal('.03')):
            print("Sold some coin!")
            rbh.sell(dogecoin,quantity=1)
        if currentDogePrice < (initDogePrice + Decimal('.03')):
            print("Bought some coin!")
            rbh.buy(dogecoin,quantity=1)
        time.sleep(5)

def main():
    menu()


main()
#rbh.sell(dogecoin,quantity=0.01)

