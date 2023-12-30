var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chintan.tops@gmail.com',
    pass: 'gwxi mmoo mkqg zabq'
  }
});

var mailOptions = {
    from: 'chintan.tops@gmail.com',
    to: 'pushkal.mscit@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Hello</h1>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });