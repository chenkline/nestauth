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
  
  var data = {
    clientID: curr_nest_account.clientID, 
    clientSecret: curr_nest_account.clientSecret,
    access_token: curr_nest_account.access_token,
    expires_in : "",
    title: 'NEST Access Token',
	msg: "Nest access token information.",
    layout: 'layout_bootstrap'
    };
  
  data.access_token = data.access_token == undefined ? "" : data.access_token; 
  //data.clientID = data.clientID == undefined ? '' : data.clientID; 

  res.render('nesttoken', data);
});

module.exports = router;
