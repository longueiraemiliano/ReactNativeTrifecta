/**
 * Sample React Native Web App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

var FadeInView = require('./FadeInView.js');

export default class ReactNativeTrifecta extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <FadeInView>
          <Image
            source={require('./img/amplify.png')}
            style={styles.logo}/>
        </FadeInView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    height: '57',
    width: '225',
    alignSelf: 'center',
    marginBottom: 10  
  },
});

// App registration and rendering
AppRegistry.registerComponent('ReactNativeTrifecta', () => ReactNativeTrifecta)
AppRegistry.runApplication('ReactNativeTrifecta', { rootTag: document.getElementById('react-root') })