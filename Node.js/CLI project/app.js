import fs from "node:fs/promises"

const filePath = process.argv[2]

const fileContent = await fs.readFile(filePath , 'utf-8')

const wordsArray = fileContent.split(/[\W]/).filter((word) => word)

const wordsCount = {}

wordsArray.forEach((word) => {
    if(word in wordsCount){
        wordsCount[word] += 1
    }
    else{
        wordsCount[word] = 1
    }
})

console.log(wordsCount)
