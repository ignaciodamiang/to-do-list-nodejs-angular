const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
  // Login
  signIn(req, res) {
    let { email, password } = req.body;
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            msg: 'The user with this email was not found.',
          });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            // Create token
            let token = jwt.sign({ user: user }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });
            res.json({
              user: user,
              token: token,
            });
          } else {
            res.status(401).json({
              //Unauthorized access
              msg: 'Incorrect password',
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Register
  signUp(req, res) {
    // Encrypt the password
    let password = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(authConfig.rounds)
    );
    // Create user
    User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: password,
    })
      .then((user) => {
        // Create token
        let token = jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });

        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
