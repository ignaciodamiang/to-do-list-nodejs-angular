const { User, Folder } = require('../models/index');

module.exports = {
  async all(req, res) {
    let users = await User.findAll({
      include: Folder,
    });

    res.json(users);
  },
};
