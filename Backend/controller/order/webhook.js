const stripe = require("../../config/stripe");
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

const webhook = async(req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  const payloadString = req.body.toString(); // Ensure you get the raw body as a string

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);  // Updated error log
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        console.log("Line Items:", lineItems);
      } catch (error) {
        console.error("Error fetching line items:", error);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
};

module.exports = webhook;


