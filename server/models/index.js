// index.js
//***************************************************
//*****  Server side -- server/models/index.js  *****
//*****  Accesses both User and Social models   *****
//***************************************************

module.exports = {
  User: require('./User'),
  Social: require('./Social')
}
