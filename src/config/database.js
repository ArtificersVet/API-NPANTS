// Create a Sequelize instance
import { Sequelize } from 'sequelize';

// Create a Sequelize instance
const sequelize = new Sequelize('dboNPANTS7', 'root', '12345678', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false // Disable logging for a cleaner output
});

// Export the sequelize instance
export default sequelize;
