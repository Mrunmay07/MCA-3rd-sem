import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/" )

await client.connect()

const db = client.db()

// list collections 
/* console.log(await db.listCollections().toArray())
 */
// use collection
const expenseCollection = db.collection("expenses")
const teacherCollection = db.collection("teachers")

// Read data
/* const expensesData = await expenseCollection.find().toArray()
console.log(expensesData)
 */

// Update 
const result = await expenseCollection.updateOne({title : "Starbucks"} , {$set : {title : "Coffee"}})
console.log(result)

// Delete
await expenseCollection.deleteOne({})



