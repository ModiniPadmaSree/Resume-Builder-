const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/ai/generate  -> AI content writer (summary / experience / education)
router.post('/generate', aiController.generateContent);

// POST /api/ai/review    -> Resume review & scoring
router.post('/review', aiController.reviewResume);

// POST /api/ai/chat      -> Conversational resume-building assistant
router.post('/chat', aiController.chat);

module.exports = router;
