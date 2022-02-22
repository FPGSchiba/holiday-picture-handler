const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'chunk-[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|.ico)$/,
        use: {
          loader: "url-loader",
          options: {
            name: '/[path][name].[ext]',
            outputPath: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.s[c]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, { loader: 'css-loader' },
        ],
      }
    ],
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: process.env.PORT | 8080,
    static: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.scss'],
    fallback: { "https": require.resolve("https-browserify"), "http": require.resolve("stream-http") }
  },
};
