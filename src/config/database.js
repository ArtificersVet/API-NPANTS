import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('railway', 'root', 'wlHseHzAADtPlnKBWecHIWoysqsJoVJK', {
    host: 'autorack.proxy.rlwy.net',
    dialect: 'mysql',
    logging: false,
    port: 21008
});

export default sequelize; // Esto exporta sequelize como default
