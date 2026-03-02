import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  const username = config.MONGODB_USERNAME;
  const password = config.MONGODB_PASSWORD;

  if (!username || !password) {
    console.error(
      "MongoDB: variáveis de ambiente ausentes (MONGODB_USERNAME/MONGODB_PASSWORD)",
    );
    return;
  }

  if (
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2
  ) {
    return;
  }

  const encodedPassword = encodeURIComponent(password);
  const uri = `mongodb+srv://${username}:${encodedPassword}@cluster0.kus5n.mongodb.net/jessicasaka?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    if (conn.connection && conn.connection.db) {
      await conn.connection.db.admin().ping();
      console.log("MongoDB OK:", conn.connection.host, conn.connection.name);
    }

  } catch (err: any) {
    console.error("MongoDB erro:", {
      name: err?.name,
      message: err?.message,
      code: err?.code,
    });
  }
}
