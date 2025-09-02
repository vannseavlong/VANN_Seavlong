/**
 * Sends a message to Telegram using the bot API
 * @param {Object} formData - The form data to send
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<boolean>} - Success status
 */
export const sendToTelegram = async (formData) => {
  // Replace these with your actual bot token and chat ID
  const BOT_TOKEN = '7183671317:AAF360Z00zQcZ9-pKdAzD4hfBL8pQMuJ9aQ';
  const CHAT_ID = '-1002959354394';
  
  const telegramAPI = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  // Format the message for Telegram
  const message = `
🌟 *New Contact Form Submission* 🌟

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📝 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

---
📅 *Received:* ${new Date().toLocaleString()}
  `.trim();

  try {
    const response = await fetch(telegramAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();
    
    if (response.ok && result.ok) {
      console.log('Message sent to Telegram successfully');
      return true;
    } else {
      console.error('Telegram API Error:', result);
      return false;
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};

/**
 * Alternative function for plain text message (without Markdown formatting)
 * @param {Object} formData - The form data to send
 * @returns {Promise<boolean>} - Success status
 */
export const sendToTelegramPlain = async (formData) => {
  const BOT_TOKEN = '7183671317:AAF360Z00zQcZ9-pKdAzD4hfBL8pQMuJ9aQ';
  const CHAT_ID = '-1002959354394';

  const telegramAPI = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  const message = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Received: ${new Date().toLocaleString()}
  `.trim();

  try {
    const response = await fetch(telegramAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    const result = await response.json();
    
    if (response.ok && result.ok) {
      console.log('Message sent to Telegram successfully');
      return true;
    } else {
      console.error('Telegram API Error:', result);
      return false;
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};
