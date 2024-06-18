#include <iostream>
using namespace std;

// Function to add two numbers
int addNumbers(int a, int b) {
    int sum = a + b;
    return sum;
}

int main() {
    int num1, num2;

    cout << "Enter 1st number: ";
    cin >> num1;
    cout << "Enter 2nd number: ";
    cin >> num2;

    int result = addNumbers(num1, num2); // Calling the function

    cout << "The sum is: " << result << endl;
    return 0;

}
