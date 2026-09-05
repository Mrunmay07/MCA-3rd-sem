console.log('Hi-1')

function sayHello(){
    console.log('Hi-3')
}

function sayHello2(){
    console.log('Hi-4')
}

function sayHello3(){
    console.log('Hello world')
}

for(let i = 1 ; i <= 4 ; i++){
    console.log(i)
}

setTimeout(sayHello , 3000) // asynchronous 
setTimeout(sayHello2 , 1000)
setTimeout(sayHello3 , 4000)

console.log('Hi-2')