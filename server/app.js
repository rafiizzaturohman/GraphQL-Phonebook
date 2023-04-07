var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
var { graphqlHTTP } = require('express-graphql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { schema, root } = require('./graphql/contactSchema');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = app;
