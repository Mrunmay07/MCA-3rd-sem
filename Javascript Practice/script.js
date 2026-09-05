/* 
callMe()

var username = "Akash" 

function sum(){
    let a = 10    
    let b = 20
    
    function sayHello(){
        let x = 10
        let y = 20
        console.log(a + b)

    }
    return sayHello

}

const result = sum() // function sayHello()
result()

function callMe(){
    console.log('Hi i am called')
    callMe()
}
 */


// Scoping -> Global Scope , Function Scope , block Scope
// Exection Context
// Call Stack , Stack Overflow


var a = 10      // variable define
console.log(a)  // access

// Temporal Deadzone
