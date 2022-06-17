const dotenv = require("dotenv");
dotenv.config();
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = async (email, subject, text) => {
	try {


		function getMessage() {
			
			return {
			  to: email,
			  from: process.env.USER,
			  subject: subject,
			  text: text,
			  html: `<strong>${text}</strong>`,
			};
		  }
		  await sendGridMail.send(getMessage());
		  console.log('email sent successfully');

		
	} catch (error) {
		console.error('Error sending test email');
		console.error(error);
		if (error.response) {
		  console.error(error.response.body)
		}
	  }
};
