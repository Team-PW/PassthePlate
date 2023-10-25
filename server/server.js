const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const listingsController = require('./controllers/listingsController');

const app = express();

// parse the req.body, the cookies, and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/signup', userController.createUser, (req, res) => {
  res.redirect('/');
});

app.post('/login', userController.verifyUser, (req, res) => {
  // console.log("request body in server: ", req.body)
  // res.status(200).json(res.locals.activitySave)
  res.cookie('username', res.locals.username);
  res.cookie('zipcode', res.locals.zipcode);
  res.cookie('userID', res.locals.userID);
  res.status(200).sendFile(path.resolve(__dirname, '../dist/home.html'));
});

app.get('/listings', listingsController.findListings, (req, res) => {
  console.log('made it to redirect');
  console.log(res.locals.listings);
  res.cookie('listing', res.locals.listings);
  // console.log('this is the find listing controller function:', req.body);
  // console.log('listings data made it to the server: ', res.locals.listings)
  res.status(200).json(res.locals.listings);
});

app.post('/postlisting', listingsController.postListing, (req, res) => {
  res.status(200).json(res.locals.newListing);
});

app.post('/postcomment', listingsController.postComment, (req, res) => {
  res.send(200);
});

app.get('/comments', listingsController.getComments, (req, res) => {
  res.send(200).json(res.locals.comments);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(1234, () => {
  console.log('Listening on port 1234');
});
