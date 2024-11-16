import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('dbonpants', 'root', 'WJ28@krhps', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false, // Disable logging for a cleaner output
    port:3306
});
export default sequelize;