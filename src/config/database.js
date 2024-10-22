// Create a Sequelize instance
import { Sequelize } from 'sequelize';

// Create a Sequelize instance
const sequelize = new Sequelize('railway', 'root', 'wlHseHzAADtPlnKBWecHIWoysqsJoVJK', {
    host: 'autorack.proxy.rlwy.net',
    dialect: 'mysql',
    logging: false, // Disable logging for a cleaner output
    port: 21008
});

// Export the sequelize instance
export default sequelize;
