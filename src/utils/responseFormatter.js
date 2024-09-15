const successResponse = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    statusCode: statusCode,
    success: true,
    message: message,
    data: data,
  });
};

const errorResponse = (res, message, error = "Error", statusCode = 400) => {
  return res.status(statusCode).json({
    statusCode: statusCode,
    success: false,
    message: message,
    error: error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
