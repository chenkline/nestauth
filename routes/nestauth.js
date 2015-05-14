var express = require('express');
var Nest =  require('../nest/nest.js');
var util = require('util');

var router = express.Router();
var nest = new Nest();

/* GET home page. */
router.get('/', function(req, res, next) {
  var curr_nest_account = nest.NestAccList[0];

  if (curr_nest_account.clientID == undefined){
    curr_nest_account.clientID = '';
  }
  if (curr_nest_account.clientSecret == undefined){
    curr_nest_account.clientSecret = '';
  }
  var NestAuthorizationURL = "https://home.nest.com/login/oauth2?state=STATE&client_id=" + curr_nest_account.clientID;
  
  var data = {
    clientID: curr_nest_account.clientID, 
    clientSecret: curr_nest_account.clientSecret,
    nestAuthUrl: NestAuthorizationURL,
    EditMode: false,
    title: 'NEST Authorization',
    layout: 'layout_bootstrap'
    };
  //data.clientID = data.clientID == undefined ? '' : data.clientID; 
  console.log( 'data: ' + util.inspect(data) );

  res.render('index', data);
});

router.post('/', function(req, res, next) {

  console.log( 'nestauth body: ' + util.inspect(req.body) );

  var curr_nest_account = nest.NestAccList[0];

  console.log( 'nestauth account: ' + util.inspect(req.body) );

  if (curr_nest_account.clientID == undefined){
    curr_nest_account.clientID = '';
  }
  if (curr_nest_account.clientSecret == undefined){
    curr_nest_account.clientSecret = '';
  }
  if (curr_nest_account.clientID == '' || curr_nest_account.clientSecret == '')
  {
    console.log("redirect to /");
    res.redirect('/');
  }
  
  var NestAuthorizationURL = "https://home.nest.com/login/oauth2?state=STATE&client_id=" + curr_nest_account.clientID;
  
  res.redirect(NestAuthorizationURL);
  
});

module.exports = router;
