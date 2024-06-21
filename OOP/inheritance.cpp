#include <iostream>
using namespace std;

// Base class
class Animal {
public:
    void eat() {
        cout << "This animal is eating." << endl;
    }
};

// Derived class
class Dog : public Animal {
public:
    void bark() {
        cout << "The dog is barking." << endl;
    }
};

int main() {
    // Create an object of the Dog class
    Dog myDog;

    // Call methods
    myDog.eat();   // Inherited from Animal class
    myDog.bark();  // Defined in Dog class

    return 0;
}
