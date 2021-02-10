const express = require('express');
const sendMail = require('./mail.js')
const path = require('path');
const dotenv = require('dotenv');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
dotenv.config({ path:'./config.env' });

//Data parsing
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/email', (req, res) => {
    console.log('Data: ', req.body);
    const {fname, lname, phone, email, code} = req.body
    sendMail(fname, lname, phone, email, code, function(err, data){
        if(err) {
            console.log(err);
        } else {
            res.json({message: 'Email sent'})
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening');
})