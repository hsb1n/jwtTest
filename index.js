const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://oktmdqls:tmdqlssla1!@cluster0-onk01.mongodb.net/jwtReal?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req,res)=> res.send('안녕ㅋㅋ'))
app.listen(port, ()=>console.log(`Example app listening on port ${port}! `))