import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/")

await client.connect()

const db = client.db() // test database 

const expenseCollection = await db.collection("expenses")

const page = 1
const lm = 3

// Find
const cursor = await expenseCollection.find().skip((page-1)*lm).limit(lm)

while(await cursor.hasNext()){
    console.log(await cursor.next())
}


