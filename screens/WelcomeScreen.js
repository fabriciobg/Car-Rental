import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import logo from '../assets/rent256px.png';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.welcome}>Seja bem vindo(a)</Text>
        <Image style={styles.logo} source={logo} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Menu')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36485f',
  },
  welcome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  logo: {
    marginTop: 30,
    marginBottom: 50,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    marginTop: 15,
    backgroundColor: '#rgba(89, 203, 189, 0.4)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#rgba(255,255,255,0.1)',
    marginHorizontal: 70,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Courier New',
    fontStyle: 'oblique',
  },
});
