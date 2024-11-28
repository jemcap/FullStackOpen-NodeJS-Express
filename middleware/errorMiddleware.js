const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = errorHandler;
