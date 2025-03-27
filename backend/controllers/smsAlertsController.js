// backend/controllers/smsAlertsController.js

const recipients = [
    { id: 1, name: 'John Doe', phoneNumber: '+15551234567' },
    { id: 2, name: 'Jane Smith', phoneNumber: '+15559876543' },
    { id: 3, name: 'David Lee', phoneNumber: '+15551122334' },
  ];
  
  let alertMessage = 'Emergency: Severe weather warning! Please stay indoors.';
  
  const getRecipients = (req, res) => {
    res.json(recipients);
  };
  
  const updateRecipient = (req, res) => {
    const { id } = req.params;
    const { name, phoneNumber } = req.body;
  
    const recipientIndex = recipients.findIndex(r => r.id === parseInt(id));
  
    if (recipientIndex === -1) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
  
    recipients[recipientIndex] = { ...recipients[recipientIndex], name, phoneNumber };
    res.json(recipients);
  };
  
  const deleteRecipient = (req, res) => {
    const { id } = req.params;
    const recipientIndex = recipients.findIndex(r => r.id === parseInt(id));
  
    if (recipientIndex === -1) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
  
    recipients.splice(recipientIndex, 1);
    res.json(recipients);
  };
  
  const addRecipient = (req, res) => {
    const { name, phoneNumber } = req.body;
    const newRecipient = { id: recipients.length + 1, name, phoneNumber };
    recipients.push(newRecipient);
    res.json(recipients);
  };
  
  const getAlertMessage = (req, res) => {
    res.json({ message: alertMessage });
  };
  
  const updateAlertMessage = (req, res) => {
    alertMessage = req.body.message;
    res.json({ message: alertMessage });
  };
  
  const sendDummyAlert = (req, res) => {
    recipients.forEach(recipient => {
      console.log(`Sending SMS to ${recipient.name} (${recipient.phoneNumber}): ${alertMessage}`);
    });
    res.json({ message: 'Dummy alerts sent (check console)' });
  };
  
  module.exports = {
    getRecipients,
    updateRecipient,
    deleteRecipient,
    addRecipient,
    getAlertMessage,
    updateAlertMessage,
    sendDummyAlert,
  };