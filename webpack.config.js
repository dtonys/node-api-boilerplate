// Webpack config adopted from `backpack` project,
// https://github.com/jaredpalmer/backpack/blob/6b448c43831e1afa40962aa24c81c2b209134ef3/packages/backpack-core/config/webpack.config.js

const path = require('path');

const nodeExternals = require('webpack-node-externals');


const PATHS = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
};

module.exports = ( /* env */ ) => {
  return {
    target: 'node',
    devtool: 'source-map',
    // exclude node_modules from bundling, except for asset resources
    externals: nodeExternals({
      whitelist: [
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|less|styl)$/,
      ],
    }),
    // ignore bundle size perf hints
    performance: {
      hints: false,
    },
    node: {
      __filename: true,
      __dirname: true,
    },
    entry: {
      server: [
        path.join( PATHS.src, 'server.js' ),
      ],
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: PATHS.src,
          options: {
            babelrc: true,
            cacheDirectory: true,
          },
        },
      ],
    },
    plugins: [],
  };
};
