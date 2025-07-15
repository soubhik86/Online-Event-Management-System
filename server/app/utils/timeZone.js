exports.convertToUserTimezone = (date, timezone) => {
  try {
    const options = {
      timeZone: timezone,
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  } catch (err) {
    console.error('Invalid timezone or date:', err);
    return date;
  }
};
