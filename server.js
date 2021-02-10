const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


dotenv.config({ path:'./config.env' });
const app = express();
app.use(express.static(path.join(__dirname, 'public')));



const auth = {
    auth: {
        api_key:process.env.MAIL_GUN_API_KEY,
        domain:process.env.MAIL_GUN_DOMAIN,
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (fn, ln, phone, email, code, cb) => {
    const mailOptions = {
        from: email,
        to: 'info@cableex.biz',
        subject: 'New Landing Page Request',
        html: `
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${fn}, ${ln} </li>
        <li>Email: ${email} </li>
        <li>Phone Number: ${phone} </li>

        <h1>Discount Code</h1>
        <p>${code}</p>
        `
    }
    
    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
};

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