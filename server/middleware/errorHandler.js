export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: err.message });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};