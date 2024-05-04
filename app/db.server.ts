import { MongoClient } from "mongodb";

if (typeof process.env.DATABASE_DEBUG_FLAG !== "string") {
  throw new Error("Missing env: DATABASE_DEBUG_FLAG");
}

if (typeof process.env.MONGOURL !== "string") {
  throw new Error("Missing env: MONGOURL");
}

const debugDatabase = Number(process.env.DATABASE_DEBUG_FLAG);

interface CustomNodeJSGlobal extends NodeJS.Global {
  mongoClient: MongoClient;
}

declare const global: CustomNodeJSGlobal;

const mongoClient = global.mongoClient || new MongoClient(process.env.MONGOURL);

if (process.env.NODE_ENV === "development") {
  global.mongoClient = mongoClient;
}

export default mongoClient;
