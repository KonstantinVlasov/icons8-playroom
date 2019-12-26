const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data.json')
const db = low(adapter)

db.defaults({
  gameState: {
    title: 'Знакомство',
    room: 'public',
    content: 'suspects'
  },
  users: [],
  evidences: [],
  rooms: [{
    id: 'public',
    title: 'Общий',
    messages: []
  }, {
    id: 'film',
    title: 'Съемочая группа',
    private: true,
    messages: [],
    suspects: [],
    evidences: []
  }, {
    id: 'cia',
    title: 'Агенты ЦРУ',
    private: true,
    messages: [],
    suspects: [],
    evidences: []
  }, {
    id: 'mi6',
    title: 'Агенты МИ6',
    private: true,
    users: ['admin'],
    messages: [],
    suspects: [],
    evidences: []
  }]
}).write()

function shuffle (array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

// const evidences = db.get('evidences').value()
// // get not proofs
// db.set('evidences1',
//   shuffle(evidences.filter(evidence => !evidence.proof && !evidence.guilty))
// ).write()
// // get proofs
// db.get('evidences1').push(
//   ...shuffle(evidences.filter(evidence => evidence.proof))
// ).write()
// // get guilty
// db.get('evidences1').push(
//   ...evidences.filter(evidence => evidence.guilty)
// ).write()
//
// console.log('db.get evidences1', db.get('evidences1').value())

module.exports = db
