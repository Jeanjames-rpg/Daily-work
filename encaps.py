class Bankaccount:
    def __init__(self,balance):
        self.__balance = balance
    
    def getbalance(self):
        return self.__balance


acc = Bankaccount(1000)
# print(acc.__balaance)
print(acc.getbalance())
print(acc._Bankaccount__balance)