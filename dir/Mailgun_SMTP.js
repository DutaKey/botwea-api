const formData = require('form-data');
const Mailgun = require('mailgun.js');

module.exports = async function (req, res) {
 API_KEY = req.query.API_KEY
 DOMAIN = 'mg.bemoacademicconsulting.com';
 mailgun = new Mailgun(formData);
 
  
  if(req.query.text==null){
     res.render(process.cwd()+"/views/docs/docsread.ejs", {title: "Example Gmail sender SMTP", subtitle: `Parameter &text, &from, &to, &subject required`, content: ""})
  } else {
  if(API_KEY==null){
    res.json({result: "parameter APIKEY_KEY mailgun invalid. https://app.mailgun.com/app/dashboard to get apikey please register"})
  } else {
  client = mailgun.client({username: req.query.subject || 'ReplAPI', key: API_KEY});
  if(req.query.to==null) {
    res.json({result: "Parameter &to Required to fill in who will send the message. from & to syntax using gmail example@gmail.com"})
  } else {
    messageData = {
  from: req.query.from || 'vikodk67@gmail.com',
  to: req.query.to,
  subject: req.query.subject || 'ReplAPI',
  text: req.query.text
  }
  coly = await client.messages.create(DOMAIN, messageData)
    if(coly.status==200){
    return {
      delivery: "already sent, please check gmail",
      type: "SMTP",
      from: req.query.from || 'vikodk67@gmail.com',
      subject: req.query.subject || 'ReplAPI',
      coly
    }
    } else {
      return {
        delivery: "cannot be sent, unauthorized"
      }
    }
  }
  }
}
}