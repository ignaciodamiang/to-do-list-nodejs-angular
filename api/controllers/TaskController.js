const { Task } = require('../models/index');

module.exports = {
  async find(req, res, next) {
    let task = await Task.findByPk(req.params.taskId);
    if (!task) {
      req.status(404).json({ msg: 'The task wasn not found.' });
    } else {
      req.task = task;
      next();
    }
  },

  //all
  async all(req, res) {
    let tasks = await Task.findAll({
      where: {
        folder_id: req.params.folderId,
      },
    });
    res.json(tasks);
  },

  async allToDo(req, res) {
    let tasks = await Task.findAll({
      where: {
        folder_id: req.params.folderId,
        done: false,
      },
    });
    res.json(tasks);
  },

  async allDone(req, res) {
    let tasks = await Task.findAll({
      where: {
        folder_id: req.params.folderId,
        done: true,
      },
    });
    res.json(tasks);
  },

  //new
  async new(req, res) {
    Task.create({
      taskName: req.body.taskName,
      folder_id: req.body.folderId,
    })
      .then((task) => {
        res.json({
          task: task,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //update
  async update(req, res) {
    if (req.body.taskName != undefined) {
      req.task.taskName = req.body.taskName;
    }
    if (req.body.done != undefined) {
      req.task.done = req.body.done;
    }
    req.task.save().then((task) => {
      res.json(task);
    });
  },

  //delete
  async delete(req, res) {
    req.task.destroy().then((task) => {
      res.json({ msg: 'The task has been deleted ' });
    });
  },
};
