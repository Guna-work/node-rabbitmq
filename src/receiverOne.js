const amqp = require('amqplib');

let message = {
  Sender: 'Guna',
  Consumer: 'User',
  Message: 'Hi from node rabbitmq'
}

connect()
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createConfirmChannel();
    const result = await channel.assertQueue('jobs');
    channel.consume("jobs", message => {
      console.log(message.content.toString())
    })
    console.log('waiting for message')
  } catch (err){
    console.error(err);
  }
}

