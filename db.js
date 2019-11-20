const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
// })
const sequelize = new Sequelize(process.env.PORT, {
    dialect: 'postgres',
})

sequelize.authenticate()
    .then(() => console.log('Postgres DB connected'))
    .catch(err => console.log(err))

module.exports = sequelize;