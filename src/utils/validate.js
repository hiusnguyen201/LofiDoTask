module.exports = {
  getError: (errors, field) => {
    const error = errors.find(({ path }) => path === field);
    return error?.msg || "";
  },
};
