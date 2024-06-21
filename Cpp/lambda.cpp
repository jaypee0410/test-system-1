#pragma hdrstop
#pragma argsused

#ifdef _WIN32
#include <tchar.h>
#else
    typedef char _TCHAR;
    #define _tmain main
#endif

#include <stdio.h>
#include <iostream>
#include <vector>
#include <algorithm>

int _tmain(int argc, _TCHAR* argv[]){

    int d=7;
    
    //[cc = capture clause](p = parameter){fd = function definition}

    std::vector <int> v{2,3,7,14,23};
    std::for_each(v.begin(),v.end(),[d](int x){
        if(x%d==0)
            std::cout<<x<<" is divisible by " << d << "\n";
        else
            std::cout<<x<<" is not divisible by " << d << "\n";
    } );

    system("pause>nul");
    return 0;
}