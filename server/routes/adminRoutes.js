const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/stats', adminController.getStats)
router.get('/generate-code', adminController.generateDiscountCode)

module.exports = router

