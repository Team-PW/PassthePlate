const db = require('../models/foodbankModel');

const listingsController = {};

listingsController.findListings = (req, res, next) => {
  // console.log("request body in RedirectController: ", userReqBod)
  console.log('request body in findListings controller', userReqBod);
  // console.log('i made it to findListings!', res.locals.user)
  // console.log('data persisted to redirected page', req.params.user)
  // let username = userReqBod[username]
  const queryString = 'SELECT * FROM listing WHERE zipcode = 11111'; // testing route handler for finding listing based on zipcode
  // need a join from listings with zip code
  db.query(queryString)
    .then((data) => {
      console.log('data from listings', data.rows);
      res.locals.listings = data.rows;
      return next();
    })
    .catch((err) =>
      next({
        log: 'listingsController.findingListing failed',
        status: 404,
        message: { err: `An error occurred ${err}` },
      })
    );
  // Query SQL DB for SELECT * WHERE userReqBody === zipcode_id
  // res.locals.listings = 'database response';
  // return next();
};

listingsController.postListing = (req, res, next) => {
  console.log(`COOKIES OBJECT IS ${JSON.stringify(req.cookies)}`);
  const queryString = `INSERT INTO listing (title, listingbody, id) VALUES ('${req.body.title}', '${req.body.listingBody}', ${req.cookies.userID})`;

  db.query(queryString)
    .then((data) => {
      console.log('new listing: ', data);
      res.locals.newListing = data;
      return next();
    })
    .catch((err) =>
      next({
        log: 'userController.postListing failed',
        status: 404,
        message: { err: `An error occurred ${err}` },
      })
    );
};

listingsController.postComment = (req, res, next) => {
  const commentReqBod = req.body;
  console.log('posting a comment thru postman: ', commentReqBod);
};

listingsController.getComments = (req, res, next) => {
  console.log('made it to getComments controller');
  const queryString = `SELECT comment_body FROM comment WHERE listing_id = ${req.cookies.id}`; // testing route handler for finding listing based on zipcode

  db.query(queryString)
    .then((data) => {
      // console.log('data from listings', data.rows)

      res.locals.comments = data.rows;
      return next();
    })
    .catch((err) => console.error('Error in findListings middleware: ', err));
};

// listingsController.findListings = (req, res, next) => {
//   console.log("request body in RedirectController: ", userReqBod)

// let username = userReqBod[username]

//   const selector = 'SELECT * FROM listings WHERE wing = $1 ORDER BY room`number';
//   //need a join from listings with zip code
//   db.query(selector, queryParams)
//   .then((data) => {
//     res.locals.listings = data.rows;
//     return next();
//   })

// // Query SQL DB for SELECT * WHERE userReqBody === zipcode_id
// res.locals.listings = 'database response';
// return next();
// };

module.exports = listingsController;
