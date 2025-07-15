const Event = require('../model/Event');
const User = require('../model/User');
const fs = require('fs');
const path = require('path');

class EventController {
  // GET: List all events
  async list(req, res) {
    try {
      const events = await Event.find({ isDeleted: { $ne: true } }).populate('organizer');
      res.render('admin/eventList', {
        title: 'Event List',
        events,
        data: {
         name: req.user?.name || 'Admin',
         email: req.user?.email || 'admin@example.com'
        }
      });
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).send('Internal Server Error');
    }
  }

  // GET: Show add event form
// GET: Show add event form
async create(req, res) {
  const organizers = await User.find({ role: 'organizer' });
  res.render('admin/eventForm', {
    title: 'Add Event',
    event: {},
    organizers,
    formAction: '/admin/events/add',
    data: {
      name: req.user?.name || 'Admin',
      email: req.user?.email || 'admin@example.com'
    }
  });
}


  // POST: Save new event
  async store(req, res) {
    try {
      const {
        title,
        description,
        category,
        date,
        time,
        location,
        type,
        status,
        seats,
        ticketPrice,
        organizer
      } = req.body;
  
      if (!title || !description || !category || !date || !time || !location || !type || !status || !seats || !ticketPrice || !organizer) {
        throw new Error('All fields are required');
      }
  
      const eventData = {
        title,
        description,
        category,
        date,
        time,
        location,
        type,
        status,
        seats,
        ticketPrice,
        organizer
      };
  
      if (req.file) {
        eventData.bannerImage = req.file.filename;
      }
  
      await new Event(eventData).save();
      req.flash('success', 'Event added successfully');
      res.redirect('/admin/events'); // ✅ correct list route
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('/admin/events/add');
    }
  }
  

  // GET: Show edit form
  async edit(req, res) {
    const event = await Event.findById(req.params.id);
    const organizers = await User.find({ role: 'organizer' });

    res.render('admin/eventForm', {
      title: 'Edit Event',
      event,
      organizers,
      formAction: `/admin/events/edit/${event._id}`
    });
  }

  // POST: Update event
  async update(req, res) {
    try {
      const { title, description, date, location, organizer } = req.body;
      if (!title || !description || !date || !location || !organizer) {
        throw new Error('All fields are required');
      }

      const event = await Event.findById(req.params.id);

      if (req.file) {
        if (event.image) {
          fs.unlinkSync(path.join(__dirname, '../public/uploads', event.image));
        }
        event.image = req.file.filename;
      }

      event.title = title;
      event.description = description;
      event.date = date;
      event.location = location;
      event.organizer = organizer;

      await event.save();
      req.flash('success', 'Event updated successfully');
      res.redirect('/admin/events');
    } catch (err) {
      req.flash('error', err.message);
      res.redirect(`/admin/events/edit/${req.params.id}`);
    }
  }

  // GET: Delete event
  async remove(req, res) {
    const event = await Event.findById(req.params.id);
    if (event.image) {
      fs.unlinkSync(path.join(__dirname, '../public/uploads', event.image));
    }

    await Event.findByIdAndUpdate(req.params.id, { isDeleted: true });
    req.flash('success', 'Event deleted successfully');
    res.redirect('/admin/events');
  }
}

module.exports = new EventController();
