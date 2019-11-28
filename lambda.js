'use strict';

const awsServerlessExpress = require('aws-serverless-express')
  , app = require('./polka')
  , server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);