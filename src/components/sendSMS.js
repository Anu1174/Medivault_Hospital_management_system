// src/utils/sendSMS.js (or src/components/sendSMS.js)
export const sendSMS = async (contact, uniqueId) => {
  try {
    const response = await fetch('http://localhost:5000/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, uniqueId }),
    });

    const data = await response.json();
    if (data.message === 'SMS sent successfully.') {
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, message: 'Failed to send SMS' };
  }
};
