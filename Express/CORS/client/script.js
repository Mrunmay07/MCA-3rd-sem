const userCredentials = {
    email : "akash@gmail.com",
    password : 12345
}

const res = await fetch("http://localhost:7000/login" , {
    method : "POST",
    body : JSON.stringify(userCredentials),
    headers:{
        "Content-Type":"text/plain"
    }
});
const data = await res.json();
console.log(data);


