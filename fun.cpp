#include <iostream>
using namespace std;
int func(int n){
    int res;
    if (n>1)
        res=n*func(n-1);
    else if (n=1)
        res=1;
    return res;
}
int main(){
    int n;
    cout<<"Введите число: "<<endl;
    cin>>n;
    cout<<endl<<"Факториал: "<<func(n);
}
import unittest
import Calculator
from Calculator import Calculator
class TestCalculator(unittest.TestCase):
    def setUp(self):
        self.calculator=Calculator()
    def test_add_1(self):
        self.assertEqual(self.calculator.add(4,7),11)
    def test_add_2(self):
        self.assertEqual(self.calculator.add(-1, -2),-3)
    def test_subtract_1(self):
        self.assertEqual(self.calculator.subtract(10,5),5)
    def test_subtract_2(self):
        self.assertEqual(self.calculator.subtract(-10,-5),-5)
    def test_multiply_1(self):
        self.assertEqual(self.calculator.multiply(3,7),21)
    def test_multiply_2(self):
        self.assertEqual(self.calculator.multiply(-4, -5), 20)
    def test_divide_1(self):
        self.assertEqual(self.calculator.divide(10,5),2)
    def test_divide_2(self):
        self.assertEqual(self.calculator.divide(-20, -5), 4)
    def test_divide_3(self):
        self.assertEqual(self.calculator.divide(10,5),2)
if __name__ == "__main__":
    unittest.main()
    class Calculator:
    #Сложение
    def add (self,x,y):
        return x+y
    #Вычитание
    def subtract (self,x,y):
        return x-y
    #Умножение
    def multiply (self,x,y):
        return x*y
    #Деление
    def divide (self,x,y):
        if y!=0:
            return x/y
        else:
            return "IllegalArgumentException"
