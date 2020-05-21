import dotenv from 'dotenv';
import App from './app';

dotenv.config();

const app = new App();

app.app.listen(3003, () =>
  console.log('[Server] Server is listening on port 3003'),
);
