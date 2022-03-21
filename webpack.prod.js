const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
// require("dotenv").config({ path: "./.env" });
const buildDate = new Date().toLocaleString();


const domain = process.env.PRODUCTION_DOMAIN;

module.exports = (env, argv) => {
  // const isProduction = argv.mode === "production";
 //  console.log(argv.mode);
 // console.log({ isProduction });

 console.log('process', process.env);
  return {
    entry: "./src/index.ts",
    mode: "production",
    output: {
      filename: '[name].[contenthash].js',
 //     publicPath: 'http://localhost:3000/'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          exclude: /\.module\.css$/,
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "webapp",
        remotes: {
          // auth: 'auth@http://localhost:3001/remoteEntry.js',
          // common: 'common@http://localhost:3002/remoteEntry.js',
          // dashboard: 'dashboard@http://localhost:3003/remoteEntry.js',
          // header: 'header@http://localhost:3004/remoteEntry.js',

          auth: `auth@${domain}/auth/remoteEntry.js`,
          dashboard:`dashboard@${domain}/dashboard/remoteEntry.js`,
          header: `header@${domain}/header/remoteEntry.js`,
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};