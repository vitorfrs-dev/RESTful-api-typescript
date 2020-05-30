import mongoose from 'mongoose';

class DB {
  conn: any;

  constructor() {
    this.conn = mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('[Database] Database connected');
      });
  }
}

export default DB;
