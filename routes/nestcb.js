var express = require('express');
var url = require('url');
var util = require('util');
var https = require('https');
var querystring = require('querystring');
var events = require('events');
var router = express.Router();
var Nest =  require('../nest/nest.js');

var nest = new Nest();
  
var options = {
  host: 'api.home.nest.com',
  path: '',
  method: 'POST'
};

function clone(obj){ 
  return JSON.parse( JSON.stringify( obj ) ); 
}

/* receive nest callback. */
router.get('/', function(req, res, next) {
  var urlobj = url.parse(req.url,true);
  var querystr = util.inspect(urlobj.query);
  console.log( "querystr: " + querystr);

  var clntEvents = new events.EventEmitter();
  
  clntEvents.on('token', function(tokenRes){
    console.log("tokenRes:" + tokenRes);
       
    // Read the structures:
    var reqStructOptions = clone(options);
    var access_token_obj = JSON.parse(tokenRes);
    if (access_token_obj.access_token == undefined){
      res.send('Error: no access_token,\n' 
          + 'authorization code:' + urlobj.query.code 
          + '\nclient_id:' + nestAppInfo.clientID 
          + '\nresponseData:\n' + tokenRes);
      return ;
    }
    
    reqStructOptions.path = "https://developer-api.nest.com/structures?auth=" + access_token_obj.access_token;
    reqStructOptions.Accept = 'application/json';

    console.log('reqStructOptions:' + util.inspect(reqStructOptions) );
    var clntReq = https.request(reqStructOptions, function(clntRes) {
      var clntResData = '';
      
      console.log("statusCode: ", clntRes.statusCode);
      console.log("headers: ", clntRes.headers);

      clntRes.on('data', function(d) {
        clntResData += d;
      });
      
      clntRes.on('end', function() {
        process.stdout.write('structures response:\n');
        process.stdout.write(clntResData);
        if (clntRes.statusCode == '200'){
          var thermostats = '';
          var structObj = JSON.parse(clntResData, function(k,v){
            console.log('k:', k, 'v:', v);
            if (k = 'thermostats'){
              thermostats = v;
            }
          });
          console.log('thermostats value:', thermostats);
          res.send('access_token:' + access_token_obj.access_token + '\nthermostats:\n' + thermostats);
        }else{
          res.send('Error: can\'t get structures, ' + 'access_token:' + access_token_obj.access_token + '\nresponseData:\n' + clntResData);
        }
      });
    
    });
    clntReq.end();

    clntReq.on('error', function(e) {
      console.error(e);
    }); 
  
  });

  nest.NestAccList[0].access_token = '';
  var curr_nest_account = nest.NestAccList[0];
  console.log( 'curr_nest_account: ' + util.inspect(curr_nest_account) );
  var query_param = {
    client_id: curr_nest_account.clientID, 
    client_secret: curr_nest_account.clientSecret,
    grant_type: 'authorization_code',
    code: urlobj.query.code
    };
  
  

  var access_token_url_path = '/oauth2/access_token?'
      + querystring.stringify(query_param);   
  options.path = access_token_url_path
  console.log('query:' + querystr + 'options:' + util.inspect(options) );
 
  var clntReq = https.request(options, function(clntRes) {
    var clntResData = '';
    
    console.log("statusCode: ", clntRes.statusCode);
    console.log("headers: ", clntRes.headers);

    clntRes.on('data', function(d) {
      clntResData += d;
    });
    
   clntRes.on('end', function() {
      console.log("incoming end");
      process.stdout.write(clntResData);
      if (clntRes.statusCode == '200'){
        //clntEvents.emit('token', clntResData);
        //res.send('authorization success: ' + '\nresponseData:\n' + clntResData);
        
        var resParamObj = JSON.parse(clntResData);
        resParamObj.clientID = curr_nest_account.clientID;
        resParamObj.clientSecret = curr_nest_account.clientSecret;
        resParamObj.title = 'Nest Access token';
		resParamObj.msg = "Nest authorization success!";
		resParamObj.layout = 'layout_bootstrap';
        res.render('nesttoken', resParamObj);

        curr_nest_account.access_token = resParamObj.access_token;
        nest.NestAccList[0] = curr_nest_account;
        console.log( 'curr_nest_account: ' + util.inspect(curr_nest_account) );
      }else{
        res.send('authorization code:' + urlobj.query.code + '\nclient_id:' + nestAppInfo.clientID + '\nresponseData:\n' + clntResData);
      }
    });
  
  });
  clntReq.end();

  clntReq.on('error', function(e) {
    console.error(e);
  });  
  
});

module.exports = router;
