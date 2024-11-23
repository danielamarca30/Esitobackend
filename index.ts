import { Elysia } from 'elysia';
import { db } from './src/db/db';
import { productos} from './src/db/schema';
import { eq } from 'drizzle-orm';

const app = new Elysia()
  .get('/productos', async () => {
    return await db.select().from(productos);
  })
  .get('/productos/:id', async ({ params }) => {
    return await db.select().from(productos).where(eq(productos.id, params.id));
  })
  .post('/productos', async ({ body }) => {
    const nuevoProducto = await db.insert(productos).values(body as any);
    return { id: nuevoProducto.insertId };
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);