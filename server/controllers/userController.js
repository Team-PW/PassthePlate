const cookieParser = require('cookie-parser');
const db = require('../models/foodbankModel');

const userController = {};

userController.verifyUser = (req, res, next) => {
  // find user in database
  // console.log('testing userReqBod: ', userReqBod)
  const queryString = `SELECT username, password, zipcode, id FROM "userinfo" WHERE username = '${req.body.username}' AND password = '${req.body.password}' AND zipcode = ${req.body.zipcode}`;
  db.query(queryString)
    .then((data) => {
      console.log('data', data);
      // console.log('should log user inputted in login form', data.rows)
      if (data.rows.length !== 0) {
        // if user is found, redirect to home page (currently set to '/listings')
        console.log('user found!', data.rows);
        res.locals.username = data.rows[0].username;
        res.locals.zipcode = data.rows[0].zipcode;
        res.locals.userID = data.rows[0].id;
        return next();
        // res.redirect('/home')
      }
      // if user cannot be found, redirect to default path '/'
      return res.redirect('/');
    })
    .catch((err) => {
      console.error('Error in verifyUser middleware: ', err);
    });
};

userController.createUser = (req, res, next) => {
  // create user in database
  const queryString = 'SELECT username FROM "userinfo"';
  let currentLength;
  db.query(queryString)
    .then((response) => {
      currentLength = response.rowCount;
    })
    .then((data) => {
      const queryString1 = `INSERT INTO "userinfo"
    VALUES ('${req.body.username}', '${req.body.password}', ${
        req.body.zipcode
      }, '${currentLength + 1}')`;
      db.query(queryString1);
      return next();
    })
    .catch((err) =>
      next({
        log: 'userController.createUser failed',
        status: 404,
        message: { err: `An error occurred ${err}` },
      })
    );
  // if username already exists, redirect to default path '/'
  // if user is successfully created, redirect to home page
  //   return next();
  // }
  // creatingUser();
};

module.exports = userController;
