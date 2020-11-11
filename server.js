const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const employeeRoute = require('./routes/employee');
const adminRoute = require('./routes/admin');

const app = express();
// load config
dotenv.config({ path: './app/config/config.env' });
const PORT = process.env.PORT || 3000;

// database connection
const url = process.env.MONGO_URL;
mongoose.connect(url, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('Database Connected');
}).catch(() => {
  console.log('connection failed');
});

// middleware to see body datas
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// flash
app.use(flash());

// session store
const mongostore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

// set template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// employee session config
app.use('/employee', session({
  name: 'EmployeeCookie',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongostore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

// admin session config
app.use('/', session({
  name: 'AdminCookie',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongostore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

app.use('/employee', employeeRoute);
app.use('/', adminRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
