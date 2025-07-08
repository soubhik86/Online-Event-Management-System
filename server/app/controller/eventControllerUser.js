const Event = require('../model/Event');

class EventControllerUser {
  // ✅ GET: Fetch all public events (not deleted)
  async getAllEvents(req, res) {
    try {
      const events = await Event.find();
      res.json({ events });
    } catch (error) {
      console.error("List events error:", error);
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  }
  

  // ✅ GET: Fetch event by ID
 // GET: Fetch event by ID (simple style like listMovies)
async getEventById(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findById(id); // No populate or filters

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ event });
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
}

}

module.exports = new EventControllerUser();
