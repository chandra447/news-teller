//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/',function(req,res){
  res.sendFile(__dirname+'/signup.html');
  console.log(__dirname+'/signup.html');
});

app.post('/',function(req,res){
  const firstName = req.body.first;
  const lastName = req.body.second;
  const mail =req.body.mail;
  const data = {
    members:[
      {
        email_address: mail,
        status: 'subscribed',
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName

        }
      }
    ]

  };

  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  const url = 'https://us18.api.mailchimp.com/3.0/lists/5077ac17ca';
  const options = {
    method:'POST',
    auth: 'chandra:8ee6ffb35f47a8471f541b59959b3033-us18'};

  const request = https.request(url,options,function(response){
    if (response.statusCode==200){
      res.sendFile(__dirname+'/success.html');
    }
    else{res.sendFile(__dirname+'/failure.html');}
    response.on('data',function(data){
      console.log(JSON.parse(data));
    });


  });
  request.write(jsonData);
  request.end();



});


app.post('/failure',function(req,res){
  res.redirect('/');
});

app.listen(process.env.PORT || 3000,function(req,res){
  console.log('Server started at port 3000');
});


//8ee6ffb35f47a8471f541b59959b3033-us18
//5077ac17ca
