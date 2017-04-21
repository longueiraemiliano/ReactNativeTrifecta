# How to Setup a React Native Project for iOS, Android, and Web

These intructions tie together the instructions from the Native React [getting started](https://facebook.github.io/react-native/docs/getting-started.html) page and the React Native Web [quick start](https://github.com/necolas/react-native-web) and [getting started](https://github.com/necolas/react-native-web/blob/master/docs/guides/getting-started.md) pages. The result being an app running on 3 platforms* you can build on. 

*Well... these instructions only incude the iOS install, but the basic plumbing for Android is there as well.

## Step 1 - Preliminary React Native Install

We first start with the React Native install. For details check the React Native [getting started](https://facebook.github.io/react-native/docs/getting-started.html) page.

    brew install node
    brew install watchman
    npm install -g react-native-cli

Install XCode from the [App Store](https://itunes.apple.com/us/app/xcode/id497799835)

## Step 2 - Find right version of React Native and Create Project

You'll need the version of React Native with the React version that is React Native Web compatiable.

The trick is, React Native installs React, and you need to be sure that version is compatiable with React Native Web. So the first thing you need to know is what version of React react-native-web needs, and then what version of react-native has the version of React you need.

Install npm-remote-ls, a node module that can query dependencies remotely

    npm install npm-remote-ls

Use npm-remote-ls to check the version of react needed by react-native-web (as of this writing, 15.4.2)
<pre>
$ npm-remote-ls react-native-web | grep react@
   &#9500;&#9472; eslint-plugin-react@6.10.3
   &#9500;&#9472; react@15.4.2
   &#9474;  &#9474;  &#9500;&#9472; babel-preset-react@6.16.0
</pre>
Check what version of react-native is the most recent (as of this writing, 0.43.3)
<pre>
$ npm-remote-ls react-native | head
&#9492;&#9472; react-native@0.43.3
</pre>
Check the version of react in react-native (as of this writing 16)
<pre>
$ npm-remote-ls react-native | grep react@
   &#9500;&#9472; eslint-plugin-react@6.10.3
   &#9500;&#9472; react@16.0.0-alpha.6
</pre>
Check and earlier version of react-native (it's a match!)
<pre>
$ npm-remote-ls react-native@0.42 | grep react@
&#9500;&#9472; eslint-plugin-react@6.10.3
&#9500;&#9472; react@15.4.2
</pre>

Create the project specifing the version you need

    react-native init <project name> --version react-native@0.42

## Step 3 - Setup React Native Web in your new project

Install `react-native-web` and dependent modules

    cd <project name>
    npm install --save react-native-web webpack babel-loader url-loader file-loader

Setup web files

    cp index.ios.js index.web.js
    mkdir -p web/public

Update `index.web.js` with web rendering. Add this line to the bottom.

    AppRegistry.runApplication('ReactNativeTrifecta', { rootTag: document.getElementById('react-root') })


Create `webpack.config.js`

    var webpack = require('webpack');
    var path = require('path');

    var BUILD_DIR = path.resolve(__dirname, 'web/public');
    var APP_DIR = path.resolve(__dirname);

    var config = {
      entry: APP_DIR + '/index.web.js',
      output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
      },
      devServer:{
        contentBase: 'web/public'
      },
      module: {
        loaders: [
          {
            // Standard js/jsx compilation.
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              query: { 
                cacheDirectory: true,
                presets: ['react-native']
              }
            }
          },
          {
            // Most react-native libraries include uncompiled ES6 JS.
            test: /\.js$/,
            include: /node_modules\/react-native-/,
            use : {
              loader: 'babel-loader',
              query: { 
                cacheDirectory: true,
                presets: ['react-native']
              }
            }
          },
          {
            // This is needed for webpack to import static images in JavaScript files.
            test: /\.(gif|jpe?g|png|svg)$/,
            use: {
              loader: 'url-loader',
              query: { name: '[name].[ext]' }
            }
          }
        ]
      },
      resolve: {
        // Maps the 'react-native' import to 'react-native-web'.
        alias: {
          'react-native': 'react-native-web'
        }
      }
    };

    module.exports = config;

Create `index.html` as an html entry point in `web/public`

    <html>
      <head>
        <meta charset="utf-8">
        <title>React Native Trifecta</title>
      </head>
      <body>
        <div id="react-root" />
        <script src="bundle.js" type="text/javascript"></script>
      </body>
    </html>


Install webpack dev server and fire it up

    npm install webpack-server-dev
    node_modules/.bin/webpack-dev-server


Point your browser to localhost:8080




