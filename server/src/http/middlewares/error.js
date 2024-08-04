const handler = (err, req, res, _) => {
  const response = {
    code: err.status || 500,
    message: err.message,
  };
};

module.exports = { handler };
