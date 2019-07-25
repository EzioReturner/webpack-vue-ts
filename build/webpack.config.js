var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const postcssNormalize = require('postcss-normalize');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const notifier = require('node-notifier');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { HotModuleReplacementPlugin, ProgressPlugin, IgnorePlugin } = webpack;

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const shouldUseSourceMap = false;
  const publicPath = '/';

  const getStyleLoaders = (cssOption, preProcessor) => {
    const loaders = [
      {
        loader: require.resolve('vue-style-loader'),
        options: {
          sourceMap: false,
          shadowMode: false
        }
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOption
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            }),
            postcssNormalize()
          ]
        }
      }
    ];
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap
        }
      });
    }
    return loaders;
  };
  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: {
      app: './client/index.ts'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            'cache-loader',
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false
                }
              }
            }
          ]
        },
        {
          oneOf: [
            {
              test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
              use: [
                /* config.module.rule('images').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'img/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            /* config.module.rule('svg') */
            {
              test: /\.(svg)(\?.*)?$/,
              use: [
                /* config.module.rule('svg').use('file-loader') */
                {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[hash:8].[ext]'
                  }
                }
              ]
            },
            /* config.module.rule('media') */
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              use: [
                /* config.module.rule('media').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'media/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            /* config.module.rule('fonts') */
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
              use: [
                /* config.module.rule('fonts').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'fonts/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            /* config.module.rule('scss|sass') */
            {
              test: /\.(scss|sass)$/,
              oneOf: [
                {
                  resourceQuery: /module/,
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2,
                      modules: true,
                      localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    'sass-loader'
                  )
                },
                {
                  resourceQuery: /\?vue/,
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2
                    },
                    'sass-loader'
                  )
                },
                {
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2
                    },
                    'sass-loader'
                  )
                }
              ]
            },
            /* config.module.rule('less') */
            {
              test: /\.less$/,
              oneOf: [
                {
                  resourceQuery: /module/,
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2,
                      modules: true,
                      localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    'less-loader'
                  )
                },
                {
                  resourceQuery: /\?vue/,
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2
                    },
                    'less-loader'
                  )
                },
                {
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2
                    },
                    'less-loader'
                  )
                }
              ]
            },
            /* config.module.rule('less') */
            {
              test: /\.less$/,
              oneOf: [
                {
                  resourceQuery: /module/,
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2,
                      modules: true,
                      localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    'less-loader'
                  )
                },
                {
                  resourceQuery: /\?vue/,
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2
                    },
                    'less-loader'
                  )
                },
                {
                  use: getStyleLoaders(
                    {
                      sourceMap: false,
                      importLoaders: 2
                    },
                    'less-loader'
                  )
                }
              ]
            },
            {
              test: /\.css$/,
              oneOf: [
                {
                  resourceQuery: /module/,
                  use: getStyleLoaders({
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  })
                },
                {
                  resourceQuery: /\?vue/,
                  use: getStyleLoaders({
                    sourceMap: false,
                    importLoaders: 2
                  })
                },
                {
                  use: getStyleLoaders({
                    sourceMap: false,
                    importLoaders: 2
                  })
                }
              ]
            },
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: [
                'cache-loader',
                'babel-loader',
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                    happyPackMode: false,
                    appendTsSuffixTo: [/\.vue$/]
                  }
                }
              ]
            },
            {
              test: /\.tsx$/,
              exclude: /node_modules/,
              use: [
                'cache-loader',
                'babel-loader',
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                    happyPackMode: false,
                    appendTsxSuffixTo: [/\.vue$/]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
      // make sure to include the plugin for the magic
      new VueLoaderPlugin(),
      new FriendlyErrorsWebpackPlugin({
        // onErrors: (severity, errors) => {
        //   if (severity !== 'error') {
        //     return;
        //   }
        //   const error = errors[0];
        //   notifier.notify({
        //     title: 'webpack error',
        //     message: severity + ': ' + error.name,
        //     subtitle: error.file || ''
        //   });
        // },
        clearConsole: true
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath,
        generate: (seed, files) => {
          const manifestFiles = files.reduce(function(manifest, file) {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          return {
            files: manifestFiles
          };
        }
      }),
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../public/index.html'),
        filename: 'index.html',
        inject: 'body',
        minify: {
          removeComments: true
        }
      }),
      // new IgnorePlugin(/^\.\/locale$/, /moment$/),
      isEnvDevelopment &&
        new ForkTsCheckerWebpackPlugin({
          vue: true,
          tslint: false,
          formatter: 'codeframe',
          checkSyntacticErrors: false
        })
    ]
  };
};

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map';
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"',
//       },
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true,
//     }),
//   ]);
// }
