import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('dboNPANTS7', 'root', '12345678', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false, // Disable logging for a cleaner output
});

export default sequelize;
