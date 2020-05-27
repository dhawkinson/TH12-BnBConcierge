// setupProxy.js
// ******************************************************************************************
// *****  client side - frontend/src/setupProxy.js                                      *****
// *****  Sets up a proxy for use with server calls in development                      *****
// *****  See: https://create-react-app.dev/docs/proxying-api-requests-in-development/  *****
// ******************************************************************************************

// node modules
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const chalk = require('chalk')

const app = express

module.exports = (app) => {
  console.log(chalk.green('setupProxy'))
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }))
}