const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

const { User } = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/logout', (req, res) => {
  req.logOut(function(err, next) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logging out... See you next time!');
    res.redirect('/');
  }); // logs the user out of the session
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect. Please try again.'
}));

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password }
    });

    if (created) {
      console.log(`------ ${user.name} was created ------`);
      const successObject = {
        successRedirect: '/',
        successFlash: `Welcome ${user.name}. Account was created.`
      }

      passport.authenticate('local', successObject)(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }

  } catch (error) {
    console.log('------ Error --------');
    console.log(error);
    // Handle the user in case something goes wrong
    req.flash('error', 'Either email or password is incorrect. Please try again.');
    res.redirect('/auth/signup');
  }
});

module.exports = router;
