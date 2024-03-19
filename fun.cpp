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
