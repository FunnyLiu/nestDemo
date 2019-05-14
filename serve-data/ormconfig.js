const dir = process.env.NODE_ENV === 'production'?'dist':'src'
module.exports = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "rootroot",
    "database": "servedata",
    "entities": [`${dir}/**/**.entity{.ts,.js}`],
    "synchronize": true
}