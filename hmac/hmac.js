const {createHmac} = require('crypto')

const key = 'super-secret!'

const message = 'Ali'

const hmac = createHmac('sha256', key).update(message).digest('hex')


console.log(hmac)

const key2 = 'other-password'

const hmac2 = 'Adel'


console.log(hmac2)



