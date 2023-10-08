const {createHash} = require('crypto')

//create string hash


function hash(input){

  return createHash('sha256').update(input).digest('hex')
}

//compare two hashed passwords


let password = 'aliadel'
const hash1 = hash(password)

console.log(hash1)