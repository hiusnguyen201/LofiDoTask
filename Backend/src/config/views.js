const authLayoutPath = "layouts/auth.layout.ejs";
const mainLayoutPath = "layouts/main.layout.ejs";

const viewPaths = {
  loginView: {
    path: "auth/login",
    layout: authLayoutPath,
  },
  registerView: {
    path: "auth/register",
    layout: authLayoutPath,
  },
  homeView: {
    path: "clients/home",
    layout: mainLayoutPath,
  },
};

module.exports = viewPaths;
