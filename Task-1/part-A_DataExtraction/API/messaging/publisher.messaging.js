const amqplib = require("amqplib");
const amqpConfig = require("../config/amqp.config");

async function publisher(exchange, queue, routingKey, stringifyMessage) {
  const connection = await amqplib.connect(amqpConfig.amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  try {
    console.log("Publishing");
    const _exchange = exchange; // "user.signed_up";
    const _queue = queue; //"user.sign_up_email";
    const _routingKey = routingKey; // "sign_up_email";

    await channel.assertExchange(_exchange, "direct", { durable: true });
    await channel.assertQueue(_queue, { durable: true });
    await channel.bindQueue(_queue, _exchange, _routingKey);
    await channel.publish(exchange, routingKey, Buffer.from(stringifyMessage));
    console.log("Message published");
  } catch (e) {
    console.error("Error in publishing message", e);
  } finally {
    console.info("Closing channel and connection if available");
    await channel.close();
    await connection.close();
    console.info("Channel and connection closed");
  }
  // process.exit(0);
}

module.exports = publisher;
