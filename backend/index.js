const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const smsAlertsRoutes = require('./routes/smsAlertsRoutes');
const userRoute = require('./routes/userRoutes')

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}))
BASE_URL = "http://localhost:5000/api/sms-alerts/recipients";

// Get all recipients
app.get('/api/events/recipients', async (req, res) => {
  const recipients = await Recipient.find();
  res.json(recipients);
});

// Add new recipient
app.post('/api/events/recipients', async (req, res) => {
  const recipient = new Recipient(req.body);
  await recipient.save();
  res.json(recipient);
});

// Update recipient
app.put('/api/events/recipients/:id', async (req, res) => {
  const updatedRecipient = await Recipient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedRecipient);
});

// Delete recipient
app.delete('/api/events/recipients/:id', async (req, res) => {
  await Recipient.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipient deleted' });
});





app.get('/', (req, res) => {
    res.send("Server is running..")
})

app.use('/user', userRoute)

let events = []
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent);
  res.json(newEvent);
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

    app.get('/api/affected-areas', (req, res) => {
      // Fetch affected areas data from your database or external source
      const affectedAreas = [
        {
          name: 'Area 1',
          coordinates: [
            [22.7, 75.8],
            [22.8, 75.9],
            [22.9, 75.85],
          ],
        },
        // ... more areas
      ];
      res.json(affectedAreas);
    });
    
    app.get('/api/relief-camps', (req, res) => {
      // Fetch relief camps data
      const reliefCamps = [
        {
          name: 'Camp 1',
          location: {
            latitude: 22.75,
            longitude: 75.88,
          },
        },
        // ... more camps
      ];
      res.json(reliefCamps);
    });
    
    app.get('/api/safe-zones', (req, res) => {
      // Fetch safe zones data
      const safeZones = [
        {
          name: 'Zone 1',
          location: {
            latitude: 22.77,
            longitude: 75.9,
          },
        },
        // ... more zones
      ];
      res.json(safeZones);
    });

    // backend/server.js






app.use(cors());
app.use(express.json());

app.use('/api/sms-alerts', smsAlertsRoutes);


app.listen(3000, () => {
    console.log("server is running.. 3000")
})