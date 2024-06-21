#include <iostream>

int askNumber(int x){
    std::cout << "Insert number: ";
    std::cin >> x;
    return x;
}

int main(){

    int a;
    a = askNumber(a);
    std::cout << "You have entered: " << a;

    return 0;
}