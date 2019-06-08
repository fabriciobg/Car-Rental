import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { Constants } from 'expo';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import Navigator from './navigation/AppNavigator';
import Form from './screens/ColorForm'

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}

const styles = StyleSheet.create({});
