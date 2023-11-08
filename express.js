const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const sanitizeHtml = require('sanitize-html');
app.use(bodyParser.urlencoded({ extended: true }));
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }));
app.set('view engine', 'ejs');
const User = require('./models/User');
const SensitiveInfo = require('./models/SensitiveInfo');
function checkAuthorization(req, res, next) {
    if (!req.session.user || !req.session.user.id) {
        return res.redirect('/login');
    }
    const authenticatedUserId = parseInt(req.session.user.id, 10); 
    const requestedUserId = parseInt(req.params.userId, 10);
    console.log('Authenticated User ID:', authenticatedUserId, typeof authenticatedUserId);
    console.log('Requested User ID:', requestedUserId, typeof requestedUserId);
    console.log(authenticatedUserId === requestedUserId); 

    if (authenticatedUserId !== requestedUserId) {
      return res.status(403).send('Access Denied');
    }
    next();
  }

  function checkAdminAuthorization(req, res, next) {
    if (!req.session.user || !req.session.user.id) {
        return res.redirect('/login');
    }
    const enablePoorAccessControl = req.session.enablePoorAccessControl; 
    const toggleEnablePoorAccessControl = () => {
        req.session.enablePoorAccessControl = !enablePoorAccessControl;
    };

    res.locals.enablePoorAccessControl = enablePoorAccessControl;

    if (enablePoorAccessControl) {
        next();
    } else {
    const authenticatedUser = req.session.user; 
    if (authenticatedUser && authenticatedUser.role === 'admin') {
      next();
    } else {
      res.status(403).send('Access Denied for Non-Admins');
    }
}
  }
  
app.get('/', (req, res) => {
  res.render('home', { sanitize: true }); 
});

app.get('/xss', (req, res) => {
    res.render('form', { sanitize: true });
  });

app.get('/register', (req, res) => {
    res.render('registration');
  });

  app.get('/login', (req, res) => {
    res.render('login'); 
  });
  
app.get('/enable-poor-access-control/:userId', (req, res) => {
    req.session.enablePoorAccessControl = true;
    res.redirect(`/welcome/${req.params.userId}`);
});

app.get('/disable-poor-access-control/:userId', (req, res) => {
    req.session.enablePoorAccessControl = false;
    res.redirect(`/welcome/${req.params.userId}`);
});



  app.get('/welcome/:userId', async (req, res, next) => {
    const userId = req.params.userId; 
    const enablePoorAccessControl = req.session.enablePoorAccessControl; 

    const toggleEnablePoorAccessControl = () => {
        req.session.enablePoorAccessControl = !enablePoorAccessControl; 
    };

    res.locals.enablePoorAccessControl = enablePoorAccessControl;

    if (enablePoorAccessControl) {
        next();
    } else {
        checkAuthorization(req, res, next);
    }
}, async (req, res) => {
    const userId = req.params.userId; 
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const username = user.username;
        const role = user.role; 
        res.render('welcome', { username, role, userId});
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
});



app.post('/register', (req, res) => {
    const { username, password} = req.body;
    const role = 'user';
    req.session.enablePoorAccessControl = req.body.enablePoorAccessControl;

    User.create({
      username,
      password,
      role,
    })
      .then((user) => {
        console.log('User created:', user.toJSON());
        req.session.user = {
          id: user.id,
          username: user.username,
          role: user.role,
        };

        res.redirect('/welcome/' + user.id); 
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        res.status(500).send('User registration failed');
      });
  });


  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body.enablePoorAccessControl);
    req.session.enablePoorAccessControl = req.body.enablePoorAccessControl;
    console.log(req.session.enablePoorAccessControl);
    const user = await User.findOne({
      where: {
        username,
        password, 
      },
    });
  
    if (user && user.password === password) {
      req.session.user = {
        id: user.id,       
        username: user.username,
        role: user.role,
      };
      res.redirect(`/welcome/${user.id}`);
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  });

  app.get('/add-sensitive-info', (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.redirect('/login');
    }
    if (req.session.user && req.session.user.role === 'admin') {
        res.redirect('/view-sensitive-info/admin');
    } else {
        res.render('add-sensitive-info');
    }
});

  
  app.post('/add-sensitive-info', async (req, res) => {
    const userId = req.session.user.id; // Assuming you have user information in the session
    const {
      creditCardNumber,
      bankAccount,
      homeAddress,
      email,
      phoneNumber,
    } = req.body;
  
    try {
      
      let sensitiveInfo = await SensitiveInfo.findOne({ where: { userId } });
      
      if (!sensitiveInfo) {
        sensitiveInfo = await SensitiveInfo.create({
          userId,
          financialData: {
            creditCardNumber,
            bankAccount,
          },
          contactInfo: {
            homeAddress,
            email,
            phoneNumber,
          },
        });
      } else {
        await sensitiveInfo.update({
          financialData: {
            creditCardNumber,
            bankAccount,
          },
          contactInfo: {
            homeAddress,
            email,
            phoneNumber,
          },
        });
      }
      
      res.redirect('/welcome/' + userId); 
    } catch (error) {
      console.error('Error adding sensitive info:', error);
      res.status(500).send('Failed to add/update sensitive info');
    }
});
  app.get('/view-sensitive-info/admin/', checkAdminAuthorization, async (req, res) => {
    const adminId = req.params.adminId;
  
    try {
      const allSensitiveInfo = await SensitiveInfo.findAll();
  
      res.render('sensitive-info-all', { allSensitiveInfo });
    } catch (error) {
      console.error('Error fetching sensitive info:', error);
      res.status(500).send('Error fetching sensitive info');
    }
  });
  

function sanitizeUserInput(input) {
  return sanitizeHtml(input, {
    allowedTags: [],      
    allowedAttributes: {},  
  });
}
app.post('/submit', (req, res) => {
  const inputData = req.body.sanitize ? sanitizeUserInput(req.body.inputData) : req.body.inputData;
  res.render('result', { inputData });
});
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/');
    });
  });
  

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

