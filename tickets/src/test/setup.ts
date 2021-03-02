import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signup(): string[];
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "qlskn";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = () => {
  // BUILD a JWT payload. {id, email}
  const payload = { id: "wwsd12d", email: "test@test.com" };
  // CREATE the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // BUILD session Object. {jwt: MY_JWT}
  const session = { jwt: token };
  // TURN that session into JSON
  const sessionJSON = JSON.stringify(session);
  // TAKE JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // RETURN a string thats the cookie with encrypted data
  return [`express:sess=${base64}`];
};
