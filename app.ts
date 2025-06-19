import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

// Мок данные товаров
const products = [
  { 
    id: 1, 
    name: "Бамбуковая зубная щётка", 
    price: 299,
    description: "Экологичная щётка из бамбука",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 2, 
    name: "Экосумка", 
    price: 599,
    description: "Стильная сумка из натуральных материалов",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 3, 
    name: "Многоразовая бутылка", 
    price: 799,
    description: "Стеклянная бутылка с силиконовым чехлом",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const orders: any[] = [];

const router = new Router();
router
  .get("/products", (ctx) => {
    ctx.response.body = products;
  })
  .post("/orders", async (ctx) => {
    const body = await ctx.request.body().value;
    const orderId = orders.length + 1;
    orders.push({
      ...body,
      id: orderId,
      date: new Date().toISOString(),
      status: "new"
    });
    ctx.response.body = { success: true, orderId };
  });

const app = new Application();
app.use(oakCors()); // Разрешить запросы с любых доменов
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
