// src/config/database.js
import { Sequelize } from 'sequelize';

// Create a Sequelize instance
const sequelize = new Sequelize('railway', 'root', 'wlHseHzAADtPlnKBWecHIWoysqsJoVJK', {
    host: 'autorack.proxy.rlwy.net',
    dialect: 'mysql',
    logging: false, // Disable logging for a cleaner output
    port: 21008
});

// Test the connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;
 