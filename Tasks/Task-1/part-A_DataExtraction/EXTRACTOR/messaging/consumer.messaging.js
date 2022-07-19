const amqplib = require("amqplib");
const amqpConfig = require("../config/amqp.config");
const publishEnum = require("../DataStructures/publisher.enum");
const productService = require("../Services/product.Service/product.service");
const commentService = require("../Services/Comment.Services/comment.service");

const consumer = async function (queue) {
  const connection = await amqplib.connect(amqpConfig.amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(5);
  const _queue = queue; //'user.sign_up_email';
  process.once("SIGINT", async function () {
    //ctrl+c
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(_queue, { durable: true });
  await channel.consume(
    _queue,
    async function (msg) {
      if (_queue === publishEnum.QUEUE_PRODUCT)
        await productService
          .productExtractor(msg)
          .catch((err) => console.log(err));
      if (_queue === publishEnum.QUEUE_COMMENT)
        await commentService.productCommentExtractor(msg);
      if (_queue === publishEnum.QUEUE_ALL_COMMENT_SUB_CATEGORY)
        await commentService.commentExtractor(msg);
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
