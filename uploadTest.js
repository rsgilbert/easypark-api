const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')



const pictureName = 'adele.png'
const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
})

const upload = () => {
    const _id = 'testtest'
    const tmp_path = path.join(__dirname, pictureName)
    const srcFile = fs.createReadStream(tmp_path)
    const currentTime =new Date().getTime()
    const fileName = `${_id}AT${currentTime}`
    console.log("Filename is " + fileName)
    
    const params = {
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
        Body: srcFile
    }

    s3.upload(params, (err, data) => {
        if(err){ 
            res.status(500).end()
            throw err
        }
        console.log("File location is " + data.Location)
    })    

    s3.deleteObject()
}

// upload()

const params = {
    Bucket: S3_BUCKET_NAME,
    Key: 'testtestAT1575982089380'
}
s3.deleteObject(params, (err, data) => {
    if(err) console.log(err, err.stack)
    console.log(data)
})


