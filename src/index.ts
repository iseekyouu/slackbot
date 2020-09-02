import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import axios from  'axios';

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());
app.use(bodyParser());

const serviceUrl = 'https://hooks.slack.com/services/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';

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World';
  })
  .post('/send', async (ctx, next) => {
    const message = ctx.request.body.message;
    ctx.assert(message, 400, 'empty message')

    try {
     const result = await axios.post(
        serviceUrl,
        {
          text: message,
        },
        {
          headers: { 'content-type': 'application/json' }
        },
      );
      ctx.status = 200;
      ctx.body = result.data;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.message;
    }
  })

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3010);