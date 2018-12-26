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
  suspects: [{
    id: 1,
    name: 'Кирилл Казачек',
    description: 'Главный актер',
    image: 'https://ca.slack-edge.com/T0B5D49AB-U3QNCAT53-f037f0008de7-48'
  }, {
    id: 2,
    name: 'Маргарита Иванчикова',
    description: 'Главный актриса',
    image: 'https://icons8.com/vue-static/landings/about/team/team4.jpg'
  }, {
    id: 3,
    name: 'Анна Гольде',
    description: 'Актрисса второго плана',
    image: 'https://icons8.com/vue-static/landings/about/team/team9.jpg'
  }, {
    id: 4,
    name: 'Иван Бойко',
    description: 'Продюсер',
    image: 'https://icons8.com/vue-static/landings/about/team/team17.jpg'
  }, {
    id: 5,
    name: 'Павел малай',
    description: 'Сценарист',
    image: 'https://ca.slack-edge.com/T0B5D49AB-U0EBXTVRV-737211802997-48'
  }, {
    id: 6,
    name: 'Марат Юзбашев',
    description: 'Оператор',
    image: 'https://ca.slack-edge.com/T0B5D49AB-UCC7PK7M0-ac994a4fa9c4-48'
  }, {
    id: 7,
    name: 'Виктория Дидар',
    description: 'Костюмер',
    image: 'https://icons8.com/vue-static/landings/about/team/team32.jpg'
  }, {
    id: 8,
    name: 'Дмитрий Набойченко',
    description: 'Постановщик эффектов',
    image: 'https://ca.slack-edge.com/T0B5D49AB-U63EDPP2B-bb1048e38f41-48'
  }, {
    id: 9,
    name: 'Анастасия Гребнева',
    description: 'Звукорежиссер',
    image: 'https://icons8.com/vue-static/landings/about/team/team34.jpg'
  }, {
    id: 10,
    name: 'Евгений Просвирин',
    description: 'Каскадер',
    image: 'https://ca.slack-edge.com/T0B5D49AB-UEH13DPHP-71c2f441100f-48'
  }],
  evidences: [
    'улика 1',
    'улика 2',
    'улика 3',
    'улика 4',
    'улика 5',
    'улика 6',
    'улика 7'
  ],
  rooms: [{
    id: 'public',
    title: 'Public',
    messages: []
  }, {
    id: 'film',
    title: 'Film Group',
    private: true,
    messages: [],
    suspects: [],
    evidences: []
  }, {
    id: 'cia',
    title: 'CIA Agents',
    private: true,
    messages: [],
    suspects: [],
    evidences: []
  }, {
    id: 'mi6',
    title: 'MI6 Agents',
    private: true,
    users: ['admin'],
    messages: [],
    suspects: [],
    evidences: []
  }]
}).write()

module.exports = db
