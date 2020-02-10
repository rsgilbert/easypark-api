const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

bcrypt.compare(
    'new-user',
    '$2a$10$eQ8oiZ4JU.17Fe1wwVkIGuag6pfJsmqGVjaYfHaqzO/PALXrDZPtu',
    (err, suc) => {
        if(err) { console.log(err)}
        console.log(suc)
    }
)













// // jwt.sign("Mandazi", privateKey, (err, token) => {
// //     console.log(token)
// //     console.log("ERROr is " + err)
// // })



// const verify = token => jwt.verify(token, privateKey, (err, data) => {
//     if(err) {console.error("Error occured: " + err)}

//     else { 
//     console.dir(data)
//     return data 
// }
// })


// let k = [{
//     name: "Gil",
//     pass: "kdf"
// }, {
//     name: "Gil",
//     pass: "kdf"
// }]
// let m = k.map(i => {
//     delete i.name
//     return i
// })
// // console.log(m)

// let signedToken = obj => jwt.sign({
//     obj
// }
// , secret, {
//     expiresIn: '48h'
// })
// let token = signedToken("matama")
// console.log(token)
// console.log(verify(token))




// console.log(fs.readFileSync(path.join(__dirname, 'secret.txt')).toString())

// let date = new Date()
// let time = date.getTime()
// let d = new Date(time - 3822299241)
// // console.log(date)
// // console.log(time)
// // console.log(d)
// // console.log(d > date)

// let dt = new Date("2019-11-25T18:23:17.115Z")
// // console.log(dt)
// // console.log(time)
// // console.log(new Date(1574758252287.02))




// const hashPassword = async password => {
//     const hash = await bcrypt.hash(password, 10)
//     console.log(hash)
//     return hash
// } 

// const kpass= async p => {
//     await hashPassword("Kfj")
//     return 
// }

// // console.log(hashPassword('kkd'))

// // "bcrypt": "^3.0.7",