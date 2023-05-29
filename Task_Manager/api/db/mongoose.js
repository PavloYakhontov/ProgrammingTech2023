const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = 'mongodb://localhost:27017/TaskManager'; // URI підключення до MongoDB

mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Підключено до MongoDB');
  // Решта коду
}).catch(error => {
  console.error('Помилка підключення до MongoDB:', error.message);
});

module.exports = {
  mongoose
};
