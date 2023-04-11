const express = require('express');
const sequelize = require('./database/connect');
const model = require('./database/index');
const router = require('./routers/MainRouters');
const app = express();
const cors = require('cors');
const port = 3030;
const path = require('path');
var logger = require('morgan');

const init = async () => {
  //database
  model.loadModels();
  await sequelize.sync();

  //cors
  app.use(cors());

  //middleware
  app.use(express.json());
  app.use(express.urlencoded());

  //display url
  app.use(logger('dev'));

  //router
  router(app);

  app.use(express.static(path.join(__dirname, '../frontend/build')));

  console.log(path.join(__dirname, '../frontend/build'));
  app.get('*', async(req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  })

  //message
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  });
}

init();


