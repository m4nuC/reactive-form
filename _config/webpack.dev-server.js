var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

var port = 8080;
var url = require('url');
var ip = 'localhost';

var server = new WebpackDevServer(webpack(config), {
  publicPath: "/dist/", // <- Where the memory build comes from
  contentBase: "./examples/basic", //<- Where the html comes from
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  stats: { colors: true },
})


//server.use('/api', proxy(url.parse('http://localhost:3080/api')));
server.listen(port, ip , function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at ' + ip + ':' + port);
});