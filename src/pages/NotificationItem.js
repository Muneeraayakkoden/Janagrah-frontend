// Backend endpoint to handle notifications
app.get('/official/notifications', async (req, res) => {
    try {
      // Fetch notifications from the database
      const notifications = await Notification.find({});
  
      res.json({ notifications });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });
  
  app.post('/official/notifications', async (req, res) => {
    try {
      // Save notification to the database
      const newNotification = new Notification(req.body);
      await newNotification.save();
  
      res.status(201).json({ message: 'Notification saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save notification' });
    }
  });
  