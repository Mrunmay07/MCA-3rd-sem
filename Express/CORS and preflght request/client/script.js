const formData = {
    email : "akash@gmail.com",
    password : 12345
}

const res = await fetch("http://localhost:7000/bin", {
    method : "PUT"
});
const data = await res.json();
console.log(data);
