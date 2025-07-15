const Registration = require('../model/Registration');
const mongoose = require('mongoose');
const QRCode = require('qrcode'); // <-- Import QR generator

class TicketController {
  async getTicketByEvent(req, res) {
    try {
      const eventId = new mongoose.Types.ObjectId(req.params.eventId);

      const ticket = await Registration.aggregate([
        {
          $match: {
            user: req.user._id,
            event: eventId
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
          $project: {
            ticketId: 1,
            registeredAt: 1,
            event: {
              title: '$eventDetails.title',
              date: '$eventDetails.date',
              location: '$eventDetails.location'
            }
          }
        }
      ]);

      if (!ticket.length) {
        return res.status(404).json({ message: 'No ticket found for this event' });
      }

      const ticketData = ticket[0];

      // Create a QR Code based on ticket ID or other useful info
      const qrPayload = `Ticket ID: ${ticketData.ticketId}\nEvent: ${ticketData.event.title}\nDate: ${ticketData.event.date}`;
      const qrCodeBase64 = await QRCode.toDataURL(qrPayload); // generates base64 image

      res.status(200).json({
        ...ticketData,
        qrCode: qrCodeBase64.replace(/^data:image\/png;base64,/, '') // frontend expects pure base64
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TicketController();
