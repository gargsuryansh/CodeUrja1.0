// backend/routes/smsAlertsRoutes.js

const express = require('express');
const smsAlertsController = require('../controllers/smsAlertsController');

const router = express.Router();

router.get('/recipients', smsAlertsController.getRecipients);
router.put('/recipients/:id', smsAlertsController.updateRecipient);
router.delete('/recipients/:id', smsAlertsController.deleteRecipient);
router.post('/recipients', smsAlertsController.addRecipient);

router.get('/alert-message', smsAlertsController.getAlertMessage);
router.put('/alert-message', smsAlertsController.updateAlertMessage);

router.post('/send-dummy', smsAlertsController.sendDummyAlert);

module.exports = router;