
var util = require('util');

function Nest()
{
    //this.NestAccList = [] ;
};

Nest.prototype.NestAccList = [];

Nest.prototype.init = function(){
      var NestAccount = {
          clientID: process.env.NEST_ID,
          clientSecret: process.env.NEST_SECRET,
          access_token: ''
      }
      if (NestAccount.clientID == undefined){
        NestAccount.clientID = '';
      }
      if (NestAccount.clientSecret == undefined){
        NestAccount.clientSecret = '';
      }

      this.NestAccList[0] = NestAccount;
      //console.log( util.inspect(NestAccount) );
}

Nest.prototype.findById = function(clientID){
    var account;
    var i;
    for (i = 0; i < this.NestAccList.length; ++i)
    {
        if (this.NestAccList[i].clientID == clientID) {
            return i;
        }
    }
    return -1;
};

module.exports = Nest;
