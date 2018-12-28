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
  users: [{
    name: 'admin',
    password: 123,
    isAdmin: true
  }],
  suspects: [{
    id: 0,
    login: 'crew0',
    password: '01',
    isAdmin: true,
    name: 'Константин Власов',
    description: 'Режиссер',
    image: 'https://icons8.com/vue-static/landings/about/team/team5.jpg',
    brief: ''
  }, {
    id: 1,
    login: 'crew1',
    password: '04',
    name: 'Кирилл Казачек',
    description: 'Главный актер',
    image: 'https://ca.slack-edge.com/T0B5D49AB-U3QNCAT53-f037f0008de7-48',
    brief: ''
  }, {
    id: 2,
    login: 'crew2',
    password: '07',
    name: 'Маргарита Иванчикова',
    description: 'Главный актриса',
    image: 'https://icons8.com/vue-static/landings/about/team/team4.jpg',
    brief: ''
  }, {
    id: 3,
    login: 'crew3',
    password: '10',
    name: 'Анна Гольде',
    description: 'Актриса второго плана',
    image: 'https://icons8.com/vue-static/landings/about/team/team9.jpg',
    brief: ''
  }, {
    id: 4,
    login: 'crew4',
    password: '13',
    name: 'Иван Бойко',
    description: 'Продюсер',
    image: 'https://icons8.com/vue-static/landings/about/team/team17.jpg',
    brief: ''
  }, {
    id: 5,
    login: 'crew5',
    password: '16',
    name: 'Павел малай',
    description: 'Сценарист',
    image: 'https://ca.slack-edge.com/T0B5D49AB-U0EBXTVRV-737211802997-48',
    brief: ''
  }, {
    id: 6,
    login: 'crew6',
    password: '19',
    name: 'Марат Юзбашев',
    description: 'Оператор',
    image: 'https://ca.slack-edge.com/T0B5D49AB-UCC7PK7M0-ac994a4fa9c4-48',
    brief: ''
  }, {
    id: 7,
    login: 'crew7',
    password: '22',
    name: 'Виктория Дидар',
    description: 'Костюмер',
    image: 'https://icons8.com/vue-static/landings/about/team/team32.jpg',
    brief: ''
  }, {
    id: 8,
    login: 'crew8',
    password: '25',
    name: 'Сергей Филков',
    description: 'Постановщик спецэффектов',
    image: 'https://ca.slack-edge.com/T0B5D49AB-UDP5RV9MW-26ee51653a22-48',
    brief: ''
  }, {
    id: 9,
    login: 'crew9',
    password: '28',
    name: 'Анастасия Гребнева',
    description: 'Звукорежиссер',
    image: 'https://icons8.com/vue-static/landings/about/team/team34.jpg',
    brief: ''
  }, {
    id: 10,
    login: 'crew10',
    password: '31',
    name: 'Евгений Просвирин',
    description: 'Каскадер',
    image: 'https://ca.slack-edge.com/T0B5D49AB-UEH13DPHP-71c2f441100f-48',
    brief: ''
  }],
  evidences: [
    'У убийцы нет кота',
    'У убийцы нет домашнего паука',
    'У убийцы нет ручной змеи',
    'У убийцы нет собаки',
    'Убийца раньше нигде не работал',
    'Убийца любит сниматься',
    'Убийца не любит фотографироваться',
    'У убийцы есть свой дом',
    'У убийцы дорогая машина',
    'Убийца не любит пить воду',
    'Убийца любит петь',
    'Убийца умееет стрелять',
    'Убийца не сидел в тюрьме',
    'Убийца любит играть в карты',
    'У убийцы нет братьев/сестер',
    'У убийцы нет жены/мужа',
    'Убийца любит флиртовать'
  ],
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

module.exports = db
