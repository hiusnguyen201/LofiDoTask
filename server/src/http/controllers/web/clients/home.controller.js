const Task = require("@models/task.model");

const routePaths = require("@config/routes");
const { homeView } = require("@config/views");

const { getSession } = require("@utils/session");
const { getDateToken } = require("@utils/jwt");

module.exports = {
  homePage: async (req, res) => {
    const { data } = getDateToken(req.cookies?.token);
    const tasks = await Task.find({
      userId: data.id,
    });

    return res.render(homeView.path, {
      layout: homeView.layout,
      title: process.env.PROJECT_NAME + " | Home",
      routePaths,
      message: getSession(req, "message"),
      tasks,
    });
  },
};
