const path = require('path');

module.exports = {
  mode: 'development', // 開発モード
  entry: './src/index.js', // エントリポイント
  output: {
    path: path.resolve(__dirname, 'dist'), // 出力先ディレクトリ
    filename: 'main.js', // 出力ファイル名
    publicPath: '/', // 静的ファイルの基準パス
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // 拡張子を省略可能に
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // JS/JSX ファイルを対象
        exclude: /node_modules/, // node_modules を除外
        use: {
          loader: 'babel-loader', // Babel を使用
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // 必要なプリセット
          },
        },
      },
      {
        test: /\.css$/, // CSS ファイルを対象
        use: ['style-loader', 'css-loader'], // CSS をバンドル
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 静的ファイルの提供ディレクトリ
    },
    compress: true, // 圧縮を有効化
    port: 8080, // 開発サーバーのポート番号
    open: true,
    hot: true,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      return middlewares;
    },
  },
  infrastructureLogging: {
    level: 'verbose', // 詳細なログを出力
  },
};
