import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';

import logo from '../assets/rent64px.png';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>CAR RENTAL</Text>
          <Image source={logo} />
        </View>
        <View style={styles.container2}>
          <StatusBar barStyle="light-content" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //Alert.alert('Funcionalidade do botão.');
              this.props.navigation.navigate('RentForm');
            }}>
            <Text style={styles.buttonText}>Fazer reserva</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //Alert.alert('Funcionalidade do botão.');
              this.props.navigation.navigate('RegisterMenu');
            }}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('ConsultMenu');
            }}>
            <Text style={styles.buttonText}>Consultar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#36485f',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    flexDirection: 'row',
    marginTop: 30,
    height: 64,
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  logoText: {
    color: '#rgba(255,255,255,0.5)',
    fontSize: 45,
    marginRight: 20,
    marginTop: 15,
    fontFamily: 'Courier New',
    fontStyle: 'oblique',
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
