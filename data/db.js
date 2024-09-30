const mysql = require("mysql2"); //mysql dahil ettik
const config = require("../config")// sql bağlantısını config den çekmek için 

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password,{
host:config.db.host,
dialect:"mysql",
define: {
  timestamps:false
}
});
async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Mysql server bağlantısı başarıyla sağlandı.');
  } catch (error) {
    console.error('Mysql server bağlantısında bir hata var:', error);
  }
}

connect();

module.exports= sequelize;





