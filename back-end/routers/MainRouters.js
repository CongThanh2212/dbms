const modelsRouter = require('./ModelsRouter');
const searchRouter = require('./SearchRouter');
const loginRouter = require('../screens/login/LoginRouter');
const registerRouter = require('../screens/register/RegisterRouter');
const accountRouter = require('../screens/account/AccountRouter');

function route(app) {
    app.use('/models', modelsRouter);
    app.use('/search', searchRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/account', accountRouter);
}

module.exports = route;