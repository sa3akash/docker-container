module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || "myDB",
    REDIS_IP: process.env.REDIS_IP || "redis",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_SEC: process.env.REDIS_SEC,
}