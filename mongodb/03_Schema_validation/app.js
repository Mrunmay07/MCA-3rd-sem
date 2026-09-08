import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("usersDB");

const usersCollection = await db.collection("users");

await db.command({
  collMod: "users",
  validator: {
    $jsonSchema: {
      required: ["name", "age"],

      properties: {
        name: {
          bsonType: "string",
          minLength: 1,
        },

        age: {
          bsonType: "int",
          minimum: 18,
          maximum: 100,
        },
      },
    },
  },
});

try {
  await usersCollection.insertOne({ name: "Rohit" , age : 15});
} catch (error) {
  console.log(error);
}
