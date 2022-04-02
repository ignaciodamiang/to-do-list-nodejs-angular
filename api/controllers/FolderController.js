const { Folder, Task } = require('../models/index');

module.exports = {
  async find(req, res, next) {
    let folder = await Folder.findByPk(req.params.folderId);
    if (!folder) {
      req.status(404).json({ msg: 'The folder wasn not found.' });
    } else {
      req.folder = folder;
      next();
    }
  },

  // all
  async all(req, res) {
    let folders = await Folder.findAll({
      include: Task,
    });
    res.json(folders);
  },

  // show
  async show(req, res) {
    res.json(req.folder);
  },

  //new
  async new(req, res) {
    Folder.create({
      folderName: req.body.folderName,
      user_id: req.body.userId,
    })
      .then((folder) => {
        res.json({
          folder: folder,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // update
  async update(req, res) {
    req.folder.folderName = req.body.folderName;
    req.folder.save().then((folder) => {
      res.json(folder);
    });
  },

  // delete
  async delete(req, res) {
    req.folder.destroy().then((folder) => {
      res.json({ msg: 'The folder has been deleted ' });
    });
  },
};
