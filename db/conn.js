const mongoose  = require('mongoose')

async function main(){
    await  mongoose.connect('mongodb://127.0.0.1/coneng2')
    console.log('conectou ao mongoose')
}
main().catch((err) => console.log(err))

module.exports = mongoose