// src/config/database.js
import { Sequelize } from 'sequelize';

// Create a Sequelize instance
const sequelize = new Sequelize('dboNPANTS2', 'root', '12345678', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false // Disable logging for a cleaner output
});

// Test the connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;
