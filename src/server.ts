import App from './app';

const app = new App();

app.app.listen(3003, () =>
  console.log('[Server] Server is listening on port 3003'),
);
