import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbit() {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertExchange('video_events', 'direct', { durable: true });
    await channel.assertQueue('video_tasks', { durable: true });
    await channel.bindQueue('video_tasks', 'video_events', 'video_uploaded');    
}

export function publishToVideoQueue(data: object) {
    if (!channel) throw new Error('RabbitMQ not initialized');
    channel.publish(
        'video_events',
        'video_uploaded',
        Buffer.from(JSON.stringify(data)),
        { persistent: true }
    );
}