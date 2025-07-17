import { createClient } from 'redis';

const clientRedis = createClient({
    username: 'default',
    password: 'CZYQikDD1IsoSSbjfAYz1jozHUeAUlCO',
    socket: {
        host: process.env.REDIS_URL || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    }
});

clientRedis.on('error', err => console.log('Redis Client Error', err));

await clientRedis.connect();


export default clientRedis;