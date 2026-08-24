const userCredentials = {
    email : "akash@gmail.com",
    password : 12345
}

const res = await fetch("http://localhost:7000/login" , {
    method : "POST",
    body : {
      userCredentials :  JSON.stringify(userCredentials)
    },
    headers : {
        email : "akash@gmail.com"
    }
});
const data = await res.json();
console.log(data);


