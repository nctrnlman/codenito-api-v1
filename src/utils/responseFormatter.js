const responseFormatter = (
  res,
  success,
  message,
  data = null,
  error = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    statusCode: statusCode,
    success: success,
    message: message,
    data: success ? data : null,
    error: success ? null : error,
  });
};

module.exports = {
  responseFormatter,
};
