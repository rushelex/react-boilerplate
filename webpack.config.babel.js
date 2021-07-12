import path from 'path';

import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import WebpackBarPlugin from 'webpackbar';

import appConfig from './configs/config';
import buildInfo from './scripts/buildInfo';
import { name as appName } from './package.json';

buildInfo();

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isServe = process.env.SERVE;

let mode = 'development';
let target = 'web';
let entry = [
  `webpack-dev-server/client?http://localhost:${appConfig.config.port}`,
  'webpack/hot/only-dev-server',
  path.join(__dirname, 'src', 'index'),
];

if (isProduction) {
  mode = 'production';
  target = 'browserslist';
  entry = path.join(__dirname, 'src', 'index');
}

const getOutput = () => ({
  path: path.join(__dirname, 'dist'),
  filename: isDevelopment ? '[name].js' : '[name].[contenthash:5].js',
  publicPath: '/',
});

const getRules = () => [
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: false,
          publicPath: '',
        },
      },
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
    include: path.join(__dirname, 'src'),
    exclude: path.join(__dirname, 'node_modules'),
  },
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
    include: path.join(__dirname, 'src'),
    exclude: path.join(__dirname, 'node_modules'),
  },
  {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        configFile: isDevelopment ? 'tsconfig.dev.json' : 'tsconfig.json',
        transpileOnly: true,
        ...(isDevelopment && {
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript()],
          }),
        }),
      },
    },
    include: path.join(__dirname, 'src'),
    exclude: path.join(__dirname, 'node_modules'),
  },
  {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
    // use: 'url-loader?limit=10000&name=[name]-[hash].[ext]',
    type: 'asset',
    include: path.join(__dirname, 'src'),
    exclude: path.join(__dirname, 'node_modules'),
  },
  {
    test: /\.ico$/,
    use: 'file-loader?name=[name].[ext]',
    exclude: path.join(__dirname, 'node_modules'),
  },
  {
    test: /\.json$/,
    use: 'json-loader',
    include: path.join(__dirname, 'src'),
    exclude: path.join(__dirname, 'node_modules'),
  },
];

const getOptimization = () => ({
  splitChunks: {
    chunks: 'async',
    minSize: 20000,
    minRemainingSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
  runtimeChunk: {
    name: 'manifest',
  },
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        ecma: 8,
        mangle: false,
        keep_classnames: true,
        keep_fnames: true,
      },
    }),
  ],
});

const getPlugins = () =>
  [
    (isDevelopment || isServe) && new ReactRefreshPlugin({ overlay: false }),

    new ForkTsCheckerPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),

    new HtmlPlugin({
      title: 'react-boilerplate',
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body',
    }),

    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash:5].css',
      chunkFilename: isDevelopment ? '[name].css' : '[name].[contenthash:5].css',
    }),

    new DotenvPlugin(),

    new webpack.EnvironmentPlugin({
      APP_CONFIG: appConfig,
    }),

    isDevelopment && new ESLintPlugin(),

    isDevelopment && new webpack.HotModuleReplacementPlugin(),

    new WebpackBarPlugin({
      name: appName,
    }),

    new CopyPlugin({
      patterns: [path.join(__dirname, 'public')],
    }),
  ].filter(Boolean);

const getResolve = () => ({
  alias: {
    '~': path.join(__dirname, 'src'),
    '~assets': path.join(__dirname, 'src', 'assets'),
    '~components': path.join(__dirname, 'src', 'components'),
    '~services': path.join(__dirname, 'src', 'services'),
  },
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
});

const webpackConfig = {
  mode,
  entry,
  output: getOutput(),
  module: { rules: getRules() },
  optimization: getOptimization(),
  plugins: getPlugins(),
  target,
  resolve: getResolve(),
};

if (isDevelopment) {
  webpackConfig.devtool = 'eval-cheap-source-map';
  webpackConfig.devServer = {
    open: true,
    port: appConfig.config.port,
    stats: 'errors-only',
    inline: true,
    injectClient: false,
    historyApiFallback: true,
  };
}

module.exports = webpackConfig;
