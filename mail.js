// const nodemailer = require('nodemailer');
// const mailGun = require('nodemailer-mailgun-transport');

// const auth = {
//     auth: {
//         api_key:process.env.MAIL_GUN_API_KEY,
//         domain:process.env.MAIL_GUN_DOMAIN,
//     }
// };

// const transporter = nodemailer.createTransport(mailGun(auth));

// const sendMail = (fn, ln, phone, email, code, cb) => {
//     const mailOptions = {
//         from: email,
//         to: 'info@cableex.biz',
//         subject: 'New Landing Page Request',
//         html: `
//         <h3>Contact Details</h3>
//         <ul>
//         <li>Name: ${fn}, ${ln} </li>
//         <li>Email: ${email} </li>
//         <li>Phone Number: ${phone} </li>

//         <h1>Discount Code</h1>
//         <p>${code}</p>
//         `
//     }
    
//     transporter.sendMail(mailOptions, function(err, data) {
//         if(err) {
//             cb(err, null);
//         } else {
//             cb(null, data);
//         }
//     });
// };

// module.exports = sendMail;


