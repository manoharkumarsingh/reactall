const mongoose = require("mongoose");
require("dotenv").config();
var mongodbErrorHandler = require("mongoose-mongodb-errors");
mongoose.Promise = global.Promise;
mongoose.plugin(mongodbErrorHandler);
mongoose.connect('mongodb://manohar:m130289ca@ds141697.mlab.com:41697/techcenter', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
