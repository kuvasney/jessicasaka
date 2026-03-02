import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
  console.log('[Nitro Plugin] Iniciando bootstrap do MongoDB...')
  
  const config = useRuntimeConfig();

  const username = config.MONGODB_USERNAME;
  const password = config.MONGODB_PASSWORD;

  if (!username || !password) {
    console.error(
      "[MongoDB] Variáveis de ambiente ausentes",
      { hasUsername: !!username, hasPassword: !!password }
    );
    return;
  }

  console.log('[MongoDB] Variáveis OK, verificando readyState:', mongoose.connection.readyState)

  if (
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2
  ) {
    console.log('[MongoDB] Conexão já estabelecida, reusando')
    return;
  }

  const encodedPassword = encodeURIComponent(password);
  const uri = `mongodb+srv://${username}:${encodedPassword}@cluster0.kus5n.mongodb.net/jessicasaka?retryWrites=true&w=majority&appName=Cluster0`;

  console.log('[MongoDB] Tentando conectar...')

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    } as any);

    if (conn?.connection?.db) {
      await conn.connection.db.admin().ping();
      console.log('[MongoDB] ✓ Conectado e validado:', conn.connection.host, conn.connection.name);
    } else {
      console.log('[MongoDB] ✓ Conectado (ping não disponível)')
    }

  } catch (err: any) {
    console.error('[MongoDB] ✗ Erro ao conectar:', {
      name: err?.name,
      message: err?.message,
      code: err?.code,
    });
  }
}
