const router = require('express').Router();
const aiController = require('../apis/AI/aiController')
router.post('/analyze-resume', aiController.analyzeResume) 
module.exports = router;