const Task = require("@root/models/task.model");
const { homeRoute } = require("@root/config/routes");
const { setSessions } = require("@root/utils/session");
const { getDateToken } = require("@root/utils/jwt");

module.exports = {
  handleAdd: async (req, res) => {
    const task = req.body?.task;

    if (!task) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Task is required",
        },
      });
      return res.redirect(homeRoute);
    }

    try {
      const { data } = getDateToken(req.cookies?.token);
      await Task.create({
        title: task,
        userId: data.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSessions(req, {
        message: {
          type: "success",
          text: "Add task successful!",
        },
      });

      return res.redirect(homeRoute);
    } catch (e) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Add task failed!",
        },
      });
      return res.redirect(homeRoute);
    }
  },

  handleEdit: async (req, res) => {
    const { task = null, taskId = null } = req.body;

    if (!taskId) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Task not found",
        },
      });
      return res.redirect(homeRoute);
    }

    if (!task) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Task is required",
        },
      });
      return res.redirect(homeRoute);
    }

    try {
      await Task.findOneAndUpdate(
        {
          _id: taskId,
        },
        {
          title: task,
          updatedAt: new Date(),
        }
      );

      setSessions(req, {
        message: {
          type: "success",
          text: "Edit task successful!",
        },
      });

      return res.redirect(homeRoute);
    } catch (e) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Edit task failed!",
        },
      });
      return res.redirect(homeRoute);
    }
  },

  handleDelete: async (req, res) => {
    const { taskId = null } = req.body;

    if (!taskId) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Task not found",
        },
      });
      return res.redirect(homeRoute);
    }

    try {
      await Task.findOneAndDelete({
        _id: taskId,
      });

      setSessions(req, {
        message: {
          type: "success",
          text: "Delete task successful!",
        },
      });

      return res.redirect(homeRoute);
    } catch (e) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Delete task failed!",
        },
      });
      return res.redirect(homeRoute);
    }
  },
};
