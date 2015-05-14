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
    EditMode: true,
    title: 'NEST Authorization',
    layout: 'layout_bootstrap'
    };
  //data.clientID = data.clientID == undefined ? '' : data.clientID; 
  console.log( 'data: ' + util.inspect(data) );

  res.render('index', data);
});

router.post('/', function(req, res, next) {

  var curr_nest_account = nest.NestAccList[0];
  if (req.body.clientID != '')
  {
    curr_nest_account.clientID = req.body.clientID;
  }
  if (req.body.clientSecret != '')
  {
    curr_nest_account.clientSecret = req.body.clientSecret;
  }
  
  res.redirect('/nestauth');
});

module.exports = router;
