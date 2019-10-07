
class Handler {
  success = (code, message, payload, res) => res.status(code).json({
    status: code,
    message,
    data: payload,
  });

    error = (code, message, res) => res.status(code).json({
      status: code,
      error: message,
    })
}

export default new Handler();
