import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('dboNPANTS', 'root', '12345', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false, // Disable logging for a cleaner output
});
export default sequelize;