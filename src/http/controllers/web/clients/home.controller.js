const Job = require("../../../../models/job.model");
const routePaths = require("../../../../config/routes");
const { homeView } = require("../../../../config/views");
const { getSession } = require("../../../../utils/session");
const { verifyToken } = require("../../../../utils/jwt");

module.exports = {
  homePage: async (req, res) => {
    const { data } = verifyToken(req.cookies?.token);
    const jobs = await Job.find({
      userId: data.id,
    });

    return res.render(homeView.path, {
      layout: homeView.layout,
      title: process.env.PROJECT_NAME + " | Home",
      routePaths,
      message: getSession(req, "message"),
      jobs,
    });
  },
};
