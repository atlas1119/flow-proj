import config from './config';
import mongoose from 'mongoose';

var dbconfig = config('db', true);

var uri = dbconfig.host + ":" + dbconfig.port +"/"+ dbconfig.database;
mongoose.connect(uri, (err)=>{
  if (err) {
    console.error('connect to %s error: ', uri, err.message);
    process.exit(1);
  }
});

export default mongoose;
