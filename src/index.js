require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

/**
 * Database Setup
 */
const url = `${process.env.MONGODB_SECRET_URI_UPLOAD_DATABASE}`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 

app.use(cors()); // libera acesso para que todos os dominios acessem minha API
app.use(express.json()); // express consegue lidar c requisicoes em formato de json
app.use(express.urlencoded({ extended: true })); // express consegue lidar com envio de arquivos
app.use(morgan('dev')); // lib de log
app.use(
  '/files', 
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))  
);

app.use(require('./routes'));

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});