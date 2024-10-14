import { Sequelize } from 'sequelize';

// Create a Sequelize instance
const sequelize = new Sequelize('railway', 'root', 'wlHseHzAADtPlnKBWecHIWoysqsJoVJK', { 
       host: 'autorack.proxy.rlwy.net',
        dialect: 'mysql',
    logging: false,
    port: 21008 // Disable logging for a cleaner output
});

// Test the connection inside an async function
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
testConnection();

export default sequelize;