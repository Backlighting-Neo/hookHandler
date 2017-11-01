const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const exec = require('child_process').exec; 
const asyncExec = command => new Promise((resolve, reject) => {
  exec(command, (err, stdout, stderr) => {
    if(!err) resolve();
    else reject();
  })
})



router.all('/updateGitRepo', async (context, next) => {
  await asyncExec('cd /var/www/html/schoolcms && git pull');
  context.body = 'ok';
});

app.use(router.routes())
.use(router.allowedMethods());

app.listen(8981);