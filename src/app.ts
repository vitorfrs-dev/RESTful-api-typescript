import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import DB from './db/DB';

class App {
  app: express.Application;

  database: DB;

  constructor() {
    this.database = new DB();
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use('/files', express.static('uploads'));
  }

  routes(): void {
    this.app.get('/', (req, res) => res.sendStatus(200));
    this.app.use(routes);
  }
}

export default App;
