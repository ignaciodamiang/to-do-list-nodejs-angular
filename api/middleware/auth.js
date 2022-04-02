const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { User } = require('../models/index');

module.exports = (req, res, next) => {
  // check if the token exists
  if (!req.headers.authorization) {
    res.status(401).json({
      msg: 'Unauthorized access',
    });
  } else {
    // check if the token is valid
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        res
          .status(500)
          .json({ msg: 'An error occurred while decoding the token', err });
      } else {
        User.findByPk((req.user = decoded.user.id), { include: 'roles' }).then(
          (user) => {
            req.user = user;
            next();
          }
        );
      }
    });
  }
};
