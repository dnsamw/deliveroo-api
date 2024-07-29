import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config";
import logger from "../util/logger";


const isDev = process.env.NODE_ENV === "development";
const useSqlite = process.env.USE_SQLITE === "true";


let sequelizeConnection: Sequelize;

if (useSqlite) {
  console.warn("Using sqlite3 database");
  sequelizeConnection = new Sequelize({
    dialect: 'sqlite',
    storage: dbConfig.storage,
    logging: msg => logger.debug(msg),
  });
} else {
  sequelizeConnection = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: msg => logger.debug(msg),
    }
  );
}
const dbSync = async () => {
  try {
    await sequelizeConnection.sync({ alter: isDev });
    return { success: true };
  } catch (error) {
    throw error;
  }
};
dbSync()
  .then(res => {
    logger.info(`DB sync with status: ${res.success}`);
  })
  .catch(err => {
    logger.error("Failed to sync DB", err);
  });

export { dbSync };
 
export default sequelizeConnection;
