
const express = require('express');
const bodyParser = require('body-Parser');
const route = require('./routes/routes.js')
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://RafiShaik:fe45RDiNcaqyRfsB@cluster0.b6v5a.mongodb.net/soumen-Project-1", {
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))



app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port' + (process.env.PORT || 3000))
});