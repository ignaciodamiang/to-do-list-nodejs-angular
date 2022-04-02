const { User } = require('../models/index');

module.exports = {
  update(req, res, next) {
    if (req.user.id === req.folder.UserId || User.isAdmin(req.user.roles)) {
      next();
    } else {
      res.status(401).json({
        msg: 'You are not authorized to update this folder',
      });
    }
  },
};
