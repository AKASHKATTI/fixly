
const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res, next) => {
  try {
    
     const code =
      (req.body && (req.body.prompt || req.body.code)) ||
      (req.query && (req.query.prompt || req.query.code));

    // console.log('Received prompt:', code);

    if (!code) {
      return res.status(400).json({ error: 'Prompt or code is required' });
    }

    if (typeof aiService !== 'function') {
      throw new TypeError('aiService must be a function');
    }

    const response = await aiService(code);
    
    const reviewData = JSON.parse(response);
    res.json(reviewData);

  } catch (err) {
    next(err);
  }
};
