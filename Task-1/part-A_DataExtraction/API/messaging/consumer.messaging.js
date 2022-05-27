import { amqplib } from "amqplib";
import { amqpUrl } from "../config/amqp.config";

const processMessage = async (msg) => {
  console.log(msg.content.toString(), "Call email API here");
  //call your email service here to send the email
};

const consumer = async (queue) => {
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(10);
  const _queue = queue; //'user.sign_up_email';
  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(_queue, { durable: true });
  await channel.consume(
    _queue,
    async (msg) => {
      console.log("processing messages");
      await processMessage(msg);
      await channel.ack(msg);
    },
    {
      noAck: false,
      consumerTag: "email_consumer",
    }
  );
  console.log(" [*] Waiting for messages. To exit press CTRL+C");
};

module.exports = consumer;
