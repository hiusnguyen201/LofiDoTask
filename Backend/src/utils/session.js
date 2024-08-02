module.exports = {
  getSession: (req, name) => {
    try {
      const data = req.session[name];
      delete req.session[name];
      return data;
    } catch (e) {
      return null;
    }
  },
  setSessions: (req, obj) => {
    for (const key in obj) {
      req.session[key] = obj[key];
    }
  },
};
