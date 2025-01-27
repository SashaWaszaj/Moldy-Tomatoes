const mongoose = require('mongoose');

mongoose.connect ('mongodb://127.0.0.1:27017/movies_db')
    .then (() => {
        console.log("Conection succesfull to 'movies_db' database")
    })
    .catch((error) => {
        console.log(`There seems to be an error: ${error}`)
    })