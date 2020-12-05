require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port || 8000 ;
const uuid = require('uuid');
const AWS = require('aws-sdk');
const s3= new AWS.S3({
    accessKeyId:process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_ACCESS_SECRET,
    region:"ap-south-1"
});

app.get('/upload',(req, res) => {
    const key = `${uuid.v1()}.jpeg`
    s3.getSignedUrl('putObject',{
        Bucket:'memories-of-vit-bucket',
        ContentType:'image/jpeg',
        Key:key
    },(err,url)=>{
        if(!err){res.send({key:key,url:url})}
    })
});


app.listen(port, (req,res)=>{
    console.info(`Server listen on port ${port}`);
})