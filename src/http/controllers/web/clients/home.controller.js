const { homeView } = require("../../../../config/views");

module.exports = {
  homePage: (req, res) => {
    return res.render(homeView.path, {
      layout: homeView.layout,
      title: "Home",
    });
  },
};
