var index = require('../routes/index');
var users = require('../routes/users');

module.exports = function(app){
        app.use('/',index);
        app.use('/users',users);
}
