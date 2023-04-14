import Redis from 'ioredis';

let redis: Redis | undefined;

const getInstance = () => {

    try {
        if (!redis) {
            // Obtener la URL de conexión de Redis desde una variable de entorno
            const redisUrl = process.env.REDIS_URL;
            if (!redisUrl) {
                throw new Error('REDIS_URL not set');
            }
            redis = new Redis(redisUrl);
            redis.on('error', (error: unknown) => {
                console.warn('[Redis] Error connecting', error);
            });
        }
    } catch (e) {
        throw new Error(`[Redis] Could not create a Redis instance`);
    }

    return redis;
};

export default { getInstance };