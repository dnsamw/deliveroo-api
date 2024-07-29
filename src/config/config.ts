import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { Dialect } from "sequelize";

const isDev = process.env.NODE_ENV === "development";
const useSqlite = process.env.USE_SQLITE === "true";

export const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  dialect: useSqlite ? "sqlite" : (process.env.DB_TYPE as Dialect || "postgres"),
  database: process.env.DB_NAME || "database",
  username: process.env.DB_USER || "username",
  password: process.env.DB_PASSWORD || "password",
  storage: useSqlite ? "./database.sqlite" : undefined,
};

export const jwtConfig = {
  secret: process.env.SECRET,
  expiry: process.env.TOKEN_EXPIRY_HOUR,
  saltRound: 3,
};

export const emailConfig = {
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASS,
  emailFrom: process.env.EMAIL_FROM,
};

export const otpConfig = {
  otpExpiry: process.env.OTP_EXPIRY_MIN,
  otpSecret: process.env.OTP_SECRET,
};
