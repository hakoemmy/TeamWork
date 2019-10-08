
class Handler {
  success = (code, message, payload, res) => {
    if (payload != null) {
      return res.status(code).json({
        status: code,
        message,
        data: payload,
      });
    }
    return res.status(code).json({
      status: code,
      message,
    });
  };

    error = (code, message, res) => res.status(code).json({
      status: code,
      error: message,
    })
}

export default new Handler();
