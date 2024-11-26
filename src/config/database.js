import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('dboNPANTS', 'admin', '12345678', {
    host: 'npants.cbwae0eait5n.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false, // Disable logging for a cleaner output
    port:3306
});
export default sequelize;