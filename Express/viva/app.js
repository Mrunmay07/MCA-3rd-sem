import fs from "node:fs/promises"

// Read
const fileContent = await fs.readFile("students.txt" , 'utf-8')

console.log('Hello world')

console.log(fileContent)



