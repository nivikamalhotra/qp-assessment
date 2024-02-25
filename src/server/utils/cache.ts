const redis = require('redis');

export async function connectToRedis() {
  // make a connection to the local instance of redis
  const client = redis.createClient({
    legacyMode: true,
    PORT: 6379
  });

  if (!client.connected) {
    try {
      await client.connect();
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    }
  }
  return client;
}
