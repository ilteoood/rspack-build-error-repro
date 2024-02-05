const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {ModuleFederationPlugin} = require('@rspack/core').container

const deps = require('./package.json').dependencies

module.exports = (env, argv) => {
  return {
    entry: './src/index',
    cache: false,
    mode: 'development',
    devtool: 'source-map',
    output: {
      publicPath: 'auto',
      clean: true
    },
    devServer: {
      port: 8082,
      historyApiFallback: true,
      open: true,
      hot: true,
      static: {
        directory: path.join(__dirname, 'dist')
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/bv/api/v1/': {
          pathRewrite: {'^/bv/api/v1': ''},
          target: 'http://127.0.0.1:4010'
        }
      },
      liveReload: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: [/node_modules/],
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'typescript'
              }
            }
          },
          type: 'javascript/auto'
        },
        {
          test: /\.svg/,
          type: 'asset/inline'
        }
      ]
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'company',
        filename: 'remoteEntry.js',
        remotes: {
          components: `components@http://localhost:8085/remoteEntry.js`
        },
        exposes: {
          './company-page': './src/routes/organizations/organizationId/company/Company'
        },
        shared: {
          ...deps,
          react: {singleton: true, eager: true, requiredVersion: deps.react},
          'react-dom': {singleton: true, eager: true, requiredVersion: deps['react-dom']},
          'react-router-dom': {singleton: true, eager: true, requiredVersion: deps['react-router-dom']}
        }
      }),
      new HtmlWebpackPlugin({template: './public/index.html'}),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: 'tsconfig.build.json',
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          },
          mode: 'write-references'
        }
      })
    ]
  }
}
