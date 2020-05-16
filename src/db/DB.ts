import mongoose from 'mongoose';

class DB {
  conn: any;

  constructor() {
    this.conn = mongoose
      .connect('mongodb://localhost:27017/restApi', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('[Database] Database connected');
      });
  }
}

export default DB;
