import * as http     from 'http';
import * as mongoose from 'mongoose';
// import * as bluebird from 'bluebird';

import app from './app';
import config from './env';
// import runSeed from './seed';
import mainConfig from './env';

// bluebird.promisifyAll(mongoose);
// (<any>mongoose).Promise = bluebird;

// connect to mongo db
mongoose.connect(mainConfig.MONGO_URL, { useNewUrlParser: true }, async () => {
  if (mainConfig.NODE_ENV !== 'test') console.log('Mongodb connected on port 27017');
});
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

// listen on port
const server = http.createServer(app).listen(config.PORT, () => {
  if (mainConfig.NODE_ENV !== 'test') console.log('Server started on port ' + config.PORT + ` in ${config.NODE_ENV} mode`);
});

export default server;