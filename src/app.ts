import express from 'express';
import routes from './routes';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(express.json());
  }

  routes(): void {
    this.app.get('/', (req, res) => res.sendStatus(200));
    this.app.use(routes);
  }
}

export default App;
