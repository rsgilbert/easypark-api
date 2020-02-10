// const express = require('express')
// const router = express.Router()
// const fs = require('fs')
// const AWS = require('aws-sdk')
// const multer = require('multer')

// const { authMiddleware, s3Link } = require('./utils')
// const FinanceContacts = require('../models/financeContact')
// const uploadMiddleware = multer({ dest : 'uploads/'
//     // ,limits: { fieldSize: 3 * 1024 * 1024 }
// })

// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID 
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY 
// const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME

// const s3 = new AWS.S3({
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY
// })

// router.post('/upload', authMiddleware(), uploadMiddleware.single('profile_image'), async (req, res) => {
//     const _id = req.user.userId
//     const tmp_path = req.file.path
//     const srcFile = fs.createReadStream(tmp_path)
//     const currentTime =new Date().getTime()
//     const fileName = `${_id}AT${currentTime}`
    
//     const params = {
//         Bucket: S3_BUCKET_NAME,
//         Key: fileName,
//         Body: srcFile
//     }
//     await FinanceContacts.findByIdAndUpdate(_id, { 
//         picture: s3Link(fileName),
//         lastModified: currentTime,
//     }, { new: true}, (err, doc) => {
//         if(err) {
//             console.error(err)
//             return res.status(500).end()
//         }
//         // console.log(doc)
//         return res.json(doc)
//     })    

//     // consider using: const data = s3.upload(params).promise()
//     s3.upload(params, (err, data) => {
//         if(err){ 
//             res.status(500).end()
//             throw err
//         }
//     })    

//     // s3.deleteObject
// })

// module.exports = router