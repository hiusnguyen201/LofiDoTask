const Task = require("@root/models/task.model");
const routePaths = require("@root/config/routes");
const { homeView } = require("@root/config/views");
const { getSession } = require("@root/utils/session");
const { getDateToken } = require("@root/utils/jwt");

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
