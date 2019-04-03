'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 接口请求域名
  BASE_API: '"https://www.easy-mock.com/mock/5b470b162830032f1bff4037/example_copy"'
})
