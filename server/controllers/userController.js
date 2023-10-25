const cookieParser = require('cookie-parser');
const db = require('../models/foodbankModel');

const userController = {};

userController.verifyUser = (req, res, next) => {
  // find user in database
  // console.log('testing userReqBod: ', userReqBod)
  const queryString = `SELECT username, password, zipcode, id FROM "userinfo" WHERE username = '${req.body.username}' AND password = '${req.body.password}' AND zipcode = ${req.body.zipcode}`;
  db.query(queryString)
    .then(data => {
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
    .catch(err => {
      console.error('Error in verifyUser middleware: ', err);
    });
};

userController.findListings = (req, res, next) => {
  console.log('made it to findListings controller');
  const queryString = `SELECT l.*, u.username FROM listing l inner join "user" u on u.id = l.user_id WHERE l.zipcode = ${req.cookies.zipcode}`;
  // testing route handler for finding listing based on zipcode
  db.query(queryString)
    .then(data => {
      console.log('data from listings', data.rows);
      res.locals.listings = data.rows;
      return next();
    })
    .catch(err => console.error('Error in findListings middleware: ', err));

  // Query SQL DB for SELECT * WHERE userReqBody === zipcode_id
  // res.locals.listings = 'database response';
};

userController.postListing = (req, res, next) => {
  console.log('posting a listing thru postman: ', req.body);
  const queryString = `INSERT INTO listing (title, listing_body, zipcode, user_id) VALUES ('${req.body.title}', '${req.body.listingBody}', ${req.cookies.zipcode}, ${req.cookies.userID})`;
  db.query(queryString)
    .then(data => next())
    .catch(err => console.error('Error in postListing middleware: ', err));
};

userController.postComment = (req, res, next) => {
  console.log('posting a comment thru postman: ', req.body);
  const queryString = 'INSERT INTO comment (comment_body)';
};

userController.getComments = (req, res, next) => {
  console.log('made it to getComments controller');
  const queryString = `SELECT comment_body FROM comment WHERE listing_id = ${req.cookies.id}`; // testing route handler for finding listing based on zipcode

  db.query(queryString)
    .then(data => {
      // console.log('data from listings', data.rows)

      res.locals.comments = data.rows;
      return next();
    })
    .catch(err => console.error('Error in findListings middleware: ', err));
};

userController.createUser = (req, res, next) => {
  // create user in database
  const queryString = 'SELECT username FROM "userinfo"';
  let currentLength;
  db.query(queryString)
    .then(response => {
      currentLength = response.rowCount;
    })
    .then(data => {
      const queryString1 = `INSERT INTO "userinfo"
    VALUES ('${req.body.username}', '${req.body.password}', ${
        req.body.zipcode
      }, '${currentLength + 1}')`;
      db.query(queryString1);
      return next();
    })
    .catch(error => console.log('error:', error));
  // if username already exists, redirect to default path '/'
  // if user is successfully created, redirect to home page

  //   return next();
  // }
  // creatingUser();
};
/** Nick's possibly working SQL create user code...     */
// userController.createUser = async (req, res, next) => {
//   try {
//     console.log("userController.createUser middleware is working");

//     //capture article_link value and user value from front end request body
//     const { userName, password, zipcode } = req.body;

//     //define query parameters ($1 = article_link, $2 = user)
//     const queryParams = [username, userid, zipcode];

//     //Define SQL query
//     const text = `
//         INSERT INTO articles (userName, password, zipcode)
//         VALUES ($1, $2, $3)
//         `;

//     //Run SQL query
//     const result = await db.query(text, queryParams);
//     res.locals.user = result;
//     return next();
//   } catch (err) {
//     return next({
//       log: `error from new userCreator: ERROR : ${err}`,
//       message: {
//         err: "Error occurred in articleController.addArticle. Check server logs for more detail",
//       },
//       status: 500,
//     });
//   }
// };

module.exports = userController;
