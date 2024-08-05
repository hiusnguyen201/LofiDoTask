export default {
  handler,
};

function handler(err, req, res, _) {
  const response = {
    code: err.status || 500,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    url: req.originalUrl,
  };

  if (req.app.get("env") === "development") {
    delete response.stack;
  } else {
    console.log(response);
  }

  res.set("Content-Type", "application/json");
  res.status(response.code).json(response);
  res.end();
}
