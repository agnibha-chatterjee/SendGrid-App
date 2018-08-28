const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('Enter your Api key here'
);

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/send/email/sent', (req, res) => {
  res.send({ success: true });
});

app.post('/send/email', (req, res) => {
  const { receiversEmail, sendersEmail, subject, text, html } = req.body;
  const msg = {
    to: receiversEmail,
    from: sendersEmail,
    subject: subject,
    text: text,
    html: html
  };
  sgMail.send(msg);
  console.log('sent');
});

server.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
