// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cors        = require('cors')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var qs = require('qs');
// var { User }   = require('./app/models'); // get our mongoose model
// var Hearth   = require('./app/models'); // get our mongoose model
// var Expense   = require('./app/models'); // get our mongoose model

var Models = require('./app/models');

var Hearth = Models.hearth;
var User = Models.user;
var Expense = Models.expense;
var Saving = Models.saving;
var Budget = Models.budget;
var Resource = Models.resource;

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors());

// =======================
// routes ================
// =======================
// basic route

/**
 * @api {get} / Basic route
 * @apiName Global
 * @apiGroup Global
 * @apiSuccess {String} Hello! The API is at http://localhost: + port + /api.
 */

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// API ROUTES -------------------
//
// get an instance of the router for api routes
var apiRoutes = express.Router();

/**
 * @api {get} /api/authenticate Authentication
 * @apiName Authenticate
 * @apiGroup Api
 * @apiDescription
 * Authenticate user
 * @apiUse ApiMiddleware
 * @apiParam {String} name User name
 * @apiParam {String} password User password
 * @apiError (Error user) {Boolean} success false
 * @apiError (Error user) {String} message Authentification échouée. Utilisateur introuvable.
 * @apiError (Error user) {String} type user
 * @apiError (Error password) {Boolean} success false
 * @apiError (Error password) {String} message Authentification échouée. Mauvais mot de passe.
 * @apiError (Error password) {String} type password
 * @apiSuccess (Success) {Boolean} success true
 * @apiSuccess (Success) {String} message Enjoy your token!
 * @apiSuccess (Success) {String} token jwt token
 */

// route to authenticate a user (POST http://localhost:3000/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  User.
    findOne({name: req.body.user}).
    populate({
      path: 'hearth',
      populate: {
        path: 'resources',
        model: 'Resource'
      }
    }).
    exec(function (err, user) {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Utilisateur introuvable', type: 'user' });
      }
      else {
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Mauvais mot de passe', type: 'password'});
        }
        else {
          var token = jwt.sign(user.toObject(), app.get('superSecret'), {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
});

/**
 * @api {post} /api/register Register
 * @apiName Register
 * @apiGroup Api
 * @apiDescription
 * Save user into database
 * @apiUse ApiMiddleware
 * @apiParam {String} firstName User first name
 * @apiParam {String} lastName User last name
 * @apiParam {String} name User name
 * @apiParam {String} password User password
 * @apiError (Error) {Boolean} success false
 * @apiError (Error) {String} message L\'utilisateur existe déjà
 * @apiError (Error) {String} type user
 * @apiSuccess (Success) {Boolean} success true
 * @apiSuccess (Success) {String} message Enjoy your token!
 * @apiSuccess (Success) {String} token jwt token
 */

// route to register a user (POST http://localhost:3000/api/register)
apiRoutes.post('/register', function(req, res) {

  // create a sample user
  var nick = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: req.body.user,
    password: req.body.password
  });
  nick.save(function(err) {
    if (err){
      if(err.code === 11000){
        res.json({ success: false, message: 'L\'utilisateur existe déjà', type: 'user'});
      }
      return
    };

    var token = jwt.sign(nick.toObject(), app.get('superSecret'), {
      expiresInMinutes: 1440 // expires in 24 hours
    });

    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  });

});

/**
 * @api {get} /api/protected Protected
 * @apiName Protected
 * @apiGroup Api
 * @apiDescription
 * Test if jwt token is valid
 * @apiUse ApiMiddleware
 * @apiParam {String} token jwt token
 * @apiError (Error ) {Boolean} success false
 * @apiError (Error ) {String} content Failed to authenticate token.
 * @apiSuccess (Success) {Boolean} success true
 * @apiSuccess (Success) {String} content Protected passed
 */

// route to register a user (POST http://localhost:3000/api/register)
apiRoutes.get('/protected', function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, app.get('superSecret'), function(err) {
    if (err) {
      return res.json({ success: false, content: 'Failed to authenticate token.' });
    } else {
      res.json({
        success: true,
        content: "Protected passed"
      });
    }
  });
});

/**
* @api {post} /api/createHearth Create Hearth
* @apiName Create Hearth
* @apiGroup Api
* @apiDescription
* Create a hearth and bind it to the user
* @apiUse ApiMiddleware
* @apiParam {String} token jwt token
* @apiParam {String} heart Heart name
* @apiError (Error) {Boolean} success false
* @apiError (Error) {String} content Information manquantante.
* @apiSuccess (Success) {Boolean} success true
* @apiSuccess (Success) {String} token updated jwt token
* @apiSuccess (Success) {String} content Foyer créé
*/

// route to confiure a user (POST http://localhost:3000/api/createHearth)
apiRoutes.post('/createHearth', function(req, res) {

  let {token, hearth} = req.body
  let user = jwt.decode(token)

  if(!user.name || !hearth){
    return res.json({ success: false, content: 'Information manquantante.' });
  }

  User.findById(user._id, (e, findUser) => {
    let newHearth = new Hearth({
      name: hearth
    })
    newHearth.addUser(findUser, () => {
      newHearth.save(() => {
        token = jwt.sign(findUser.toObject(), app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        })
        res.json({
          success: true,
          token: token,
          content : "Foyer créé !"
        })
      })
    })
  })
});

/**
 * @api {post} /api/linkHearth Link Hearth
 * @apiName Link Hearth
 * @apiGroup Api
 * @apiDescription
 * Link user to a existant hearth
 * @apiUse ApiMiddleware
 * @apiParam {String} token jwt token
 * @apiParam {String} heart Heart name
 * @apiError (Error) {Boolean} success false
 * @apiError (Error) {String} content Information manquantante.
 * @apiError (ErrorFind) {Boolean} success false
 * @apiError (ErrorFind) {String} content Foyer introuvable.
 * @apiSuccess (Success) {Boolean} success true
 * @apiSuccess (Success) {String} token updated jwt token
 * @apiSuccess (Success) {String} content Utilisateur attaché
 */

// route to confiure a user (POST http://localhost:3000/api/linkHearth)
apiRoutes.post('/linkHearth', function(req, res) {

  let {token, hearth} = req.body
  let user = jwt.decode(token)

  if(!user.name || !hearth){
    return res.json({ success: false, content: 'Information manquantante.' });
  }

  User.findOne({name: user.name}, (err, findUser) => {
    Hearth.findOne({name: hearth}, (e,findHearth) => {
      if(!findHearth){
        return res.json({ success: false, content: 'Foyer introuvable' });
      }
      console.log(findHearth);
      findHearth.addUser(findUser, () => {
        token = jwt.sign(findUser.toObject(), app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        })
        res.json({
          success: true,
          token: token,
          content : "Foyer créé !"
        })
      })
    })
  });
});

/**
 * @api {post} /api/createResource Create Resource
 * @apiName Create Resource
 * @apiGroup Api
 * @apiDescription
 * Create a hearth's resource
 * @apiUse ApiMiddleware
 * @apiParam {String} token jwt token
 * @apiParam {Object} resource resource object
 * @apiError (Error) {Boolean} success false
 * @apiError (Error) {String} content Erreur.
 * @apiError (ErrorExist) {Boolean} success false
 * @apiError (ErrorExist) {String} content Ressource déjà créée
 * @apiSuccess (Success) {Boolean} success true
 * @apiSuccess (Success) {String} token updated jwt token
 */

// route to confiure a user (POST http://localhost:3000/api/createResource)
apiRoutes.post('/createResource', function(req, res) {

  let {token, resource} = qs.parse(req.body)
  let {name, value, date, repetition, to} = resource
  let user = jwt.decode(token)

  var newResource = new Resource({
    name,
    value,
    date,
    repetition,
    to
  });

  console.log(newResource);

  Hearth
    .findById(user.hearth._id)
    .exec((err, findHearth)=>{
      findHearth.addResource(newResource, () => {
        User
          .findById(user._id)
          .populate({
            path: 'hearth',
            populate: {
              path: 'resources',
              model: 'Resource'
            }
          })
          .exec((err, populateUser)=>{
            res.json({
              success: true,
              token: jwt.sign(populateUser.toObject(), app.get('superSecret'), {
                expiresInMinutes: 1440 // expires in 24 hours
              })
            })
          })
      }, e => {
        switch (e.code) {
          case 11000:
            return res.json({ success: false, content: 'Ressource déjà créée' });
            break;
          default:
            return res.json({ success: false, content: 'Erreur' });
        };
      })
    })
});

/**
 * @apiDefine ApiMiddleware
 * @apiError (Error 403) {Boolean} success false
 * @apiError (Error 403) {String} message No token provided.
 */

// route middleware to verify a token
app.use('/api/auth/', function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: err });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});


// AUTH ROUTES -------------------
//
// get an instance of the router for routes who need authentication
var authRoutes = express.Router();

// route to return all users (GET http://localhost:8080/api/users)
authRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

/**
 * @api {post} /api/auth/saveExpense SaveExpense
 * @apiName SaveExpense
 * @apiGroup Api
 * @apiDescription
 * Save user expense into database
 * @apiUse ApiMiddleware
 * @apiParam {String} token jwt token
 * @apiParam {String} product Expense product name
 * @apiParam {String} price Expense product price
 * @apiParam {String} date Expense product date
 * @apiParam {String} repetion Expense product repetion
 * @apiParam {String} user User expense
 * @apiSuccess (Success) {Boolean} success true
 * @apiSuccess (Success) {String} token updated jwt token
 */

// route to confiure a user (POST http://localhost:3000/api/auth/configure)
authRoutes.post('/saveExpense', function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var user = jwt.decode(token);
  console.log(req.body.date);
  User.findOne({name: user.name}, function(err, user){
    var expense = new Expense({
      name: req.body.product,
      price: req.body.price,
      date: req.body.timestamp,
      repetition: req.body.repetition
    })
    user.expenses.push(expense)
    user.save()
    expense.save()
    res.json({
        success: true,
        token: token,
        content : "sauvegarde effectuée"
      })
  })
});

/**
 * @api {post} /api/auth/getUserExpense getUserExpenses
 * @apiName SaveExpense
 * @apiGroup Api
 * @apiDescription
 * Get all user expenses
 * @apiUse ApiMiddleware
 * @apiParam {String} token jwt token
 * @apiSuccess (Success) {Boolean} success true
 * @apiSuccess (Success) {String} token updated jwt token
 */




// route to confiure a user (POST http://localhost:3000/api/auth/getUserExpenses)
authRoutes.post('/getUserExpenses', function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var username = jwt.decode(token).name;
  var tokenTest = null;
  const user = User.findOne({name: username}).populate('expenses').exec((err,val)=>{
    console.log(jwt.decode(tokenTest));
    res.json({
      success: true,
      token: jwt.sign(val.toObject(), app.get('superSecret'), {
        expiresInMinutes: 1440 // expires in 24 hours
      })
    })
  })
});


// apply the routes to our application with the prefix /api
apiRoutes.use('/auth', authRoutes)
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
