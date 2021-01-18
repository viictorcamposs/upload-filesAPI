require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

/**
 * Database Setup
 */
const url = "mongodb+srv://viictorcamposs:oWRiTT9AkPrN0tIJ@upload-filesapi.kcdgt.mongodb.net/upload?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 

app.use(express.json()); // express consegue lidar c requisicoes em formato de json
app.use(express.urlencoded({ extended: true })); // express consegue lidar com envio de arquivos
app.use(morgan('dev')); // lib de log

app.use(require('./routes'));

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});