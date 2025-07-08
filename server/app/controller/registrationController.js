const Registration = require('../model/Registration');
const Event = require('../model/Event');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { sendTicketEmail } = require('../utils/email');

class RegistrationController {
  // Register user for event
  async registerForEvent(req, res) {
    try {
      const eventId = new mongoose.Types.ObjectId(req.params.eventId);

      const alreadyRegistered = await Registration.findOne({
        user: req.user._id,
        event: eventId
      });
      if (alreadyRegistered) {
        return res.status(400).json({ message: 'Already registered for this event' });
      }

      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });

      const registeredCount = await Registration.countDocuments({ event: eventId });
      if (registeredCount >= event.seats) {
        return res.status(400).json({ message: 'No more seats available' });
      }

      const ticketId = uuidv4();
      const registration = new Registration({
        user: req.user._id,
        event: eventId,
        ticketId
      });

      await registration.save();
      await sendTicketEmail(req.user, event, ticketId);

      res.status(201).json({ message: 'Registered successfully', ticketId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get all registrations by user
  async getMyRegistrations(req, res) {
    try {
      const data = await Registration.aggregate([
        {
          $match: {
            user: req.user._id
          }
        },
        {
          $lookup: {
            from: 'events',
            localField: 'event',
            foreignField: '_id',
            as: 'eventDetails'
          }
        },
        { $unwind: '$eventDetails' },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        { $unwind: '$userDetails' },
        {
          $project: {
            ticketId: 1,
            registeredAt: 1,
            status: 1,
            qrCode: 1,
  
            userName: '$userDetails.name',
            userEmail: '$userDetails.email',
  
            event: {
              _id: '$eventDetails._id',
              title: '$eventDetails.title',
              date: '$eventDetails.date',
              location: '$eventDetails.location',
              type: '$eventDetails.type',
              category: '$eventDetails.category',
              bannerImage: '$eventDetails.bannerImage',
            }
          }
        }
      ]);
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
}

module.exports = new RegistrationController();
