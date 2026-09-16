import crypto from "node:crypto"
import fs from "fs/promises"


const fileContent = await fs.readFile('./file-1.txt' )
console.log(fileContent)

const hashedOutput = crypto.createHash("sha256").update(fileContent).digest("hex")

console.log(hashedOutput)