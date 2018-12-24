const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data.json')
const db = low(adapter)

db.defaults({
  users: [{
    name: 'admin',
    password: 123,
    isAdmin: true
  }],
  rooms: [{
    id: 'public',
    name: 'Public'
  }, {
    id: 'film',
    name: 'Film Group',
    private: true
  }, {
    id: 'cia',
    name: 'CIA Agents',
    private: true,
    messages: [],
    suspects: [],
    evidences: []
  }, {
    id: 'mi6',
    name: 'MI6 Agents',
    private: true,
    users: ['admin'],
    messages: [],
    suspects: [],
    evidences: []
  }]
}).write()

module.exports = db
