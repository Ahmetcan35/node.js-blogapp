const mysql = require("mysql2"); //mysql dahil ettik
const config = require("../config")// sql bağlantısını config den çekmek için 
let connection = mysql.createConnection(config.db); // sql bağlantısı

connection.connect(function(err){
if(err){
  return     console.log(err);
}
console.log("Mysql database e bağlanıldı.");
});
module.exports = connection.promise();