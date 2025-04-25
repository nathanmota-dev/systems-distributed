import amqp from 'amqplib';
import prisma from './database/db';

async function startWorker() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertExchange('video_events', 'direct', { durable: true });
        await channel.assertQueue('video_tasks', { durable: true });
        await channel.bindQueue('video_tasks', 'video_events', 'video_uploaded');

        console.log('Worker escutando fila: video_tasks');

        channel.consume('video_tasks', async (msg) => {
            if (msg) {
                const content = msg.content.toString();
                const data = JSON.parse(content);

                const { videoId, s3Key, s3Url } = data;

                console.log(`Recebido vídeo na fila: ${videoId} (${s3Key})`);
                console.log('Simulando processamento...');

                // Simula processamento (3 segundos)
                await new Promise((res) => setTimeout(res, 3000));

                // Atualiza no banco
                await prisma.video.update({
                    where: { id: videoId },
                    data: { status: 'READY' },
                });

                console.log(`Vídeo processado: ${videoId} atualizado para READY`);

                channel.ack(msg);
            }
        });
    } catch (err) {
        console.error('Erro no worker:', err);
    }
}

startWorker();