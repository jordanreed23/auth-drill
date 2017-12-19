var knex = require('./knex')

function checkIfExists(user){
  return knex('my_user').where('agentName', user)
}

function signIn(){

}

function signUp(data){
  return knex('my_user').insert(data, '*')
}

module.exports = {
  checkIfExists,
  signIn,
  signUp,
}
