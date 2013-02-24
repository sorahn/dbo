mysql = require('mysql')

creds = {
  host: 'destiny.bungie.org'
  user: 'destinypublic'
  password: 'what was wrong with tiger?'
  database: 'destinynews'
}

connection = mysql.createConnection(creds)
