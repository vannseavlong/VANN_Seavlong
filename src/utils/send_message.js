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
  // Send form data to the server API route which keeps the bot token secret
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.ok) {
      console.log("Message sent to Telegram via server API successfully");
      return true;
    } else {
      console.error("Server API Error:", result);
      return false;
    }
  } catch (error) {
    console.error("Error sending message to server API:", error);
    return false;
  }
};

/**
 * Alternative function for plain text message (without Markdown formatting)
 * @param {Object} formData - The form data to send
 * @returns {Promise<boolean>} - Success status
 */
export const sendToTelegramPlain = async (formData) => {
  // Plain variant uses server API as well
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, plain: true }),
    });

    const result = await response.json();

    if (response.ok && result.ok) {
      console.log("Plain message sent via server API successfully");
      return true;
    } else {
      console.error("Server API Error:", result);
      return false;
    }
  } catch (error) {
    console.error("Error sending plain message to server API:", error);
    return false;
  }
};
