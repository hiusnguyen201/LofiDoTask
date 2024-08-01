const authLayoutPath = "layouts/auth.layout.ejs";

const viewPaths = {
  loginView: {
    path: "auth/login",
    layout: authLayoutPath,
  },
  registerView: {
    path: "auth/register",
    layout: authLayoutPath,
  },
};

module.exports = viewPaths;
