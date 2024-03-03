var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basicAuth = require('express-basic-auth');
const db = require('./database');
const bcrypt = require('bcryptjs');

var arviointiRouter = require('./routes/arviointi.js');
var opiskelijaRouter = require('./routes/opiskelija.js');
var opintojaksoRouter = require('./routes/opintojakso.js');
var userRouter = require('./routes/user.js');

var app = express();
app.use(basicAuth( { authorizer: myAuthorizer, authorizeAsync:true, } ));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/arviointi', arviointiRouter);
app.use('/opiskelija', opiskelijaRouter);
app.use('/opintojakso', opintojaksoRouter);
app.use('/user', userRouter);

function myAuthorizer(username, password,cb){
    db.query('SELECT password FROM user WHERE username = ?',[username], 
      function(dbError, dbResults, fields) {
        if(dbError){
              response.json(dbError);
            }
        else {
          if (dbResults.length > 0) {
            bcrypt.compare(password,dbResults[0].password, 
              function(err,res) {
                if(res) {
                  console.log("succes");
                  return cb(null, true);
                }
                else {
                  console.log("wrong password");
                  return cb(null, false);
                }			
                response.end();
              }
            );
          }
          else{
            console.log("user does not exists");
            return cb(null, false);
          }
        }
      }
    );
  }

module.exports = app;