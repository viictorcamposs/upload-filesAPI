const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json()); // express consegue lidar c requisicoes em formato de json
app.use(express.urlencoded({ extended: true })); // express consegue lidar com envio de arquivos
app.use(morgan('dev')); // lib de log

app.use(require('./routes'));

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});