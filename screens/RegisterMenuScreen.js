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

export default class RegisterMenuScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>CADASTRAR</Text>
          <Image source={logo} />
        </View>
        <View style={styles.container2}>
          <StatusBar barStyle="light-content" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('CarForm');
            }}>
            <Text style={styles.buttonText}>Novo Carro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('CustomerForm');
            }}>
            <Text style={styles.buttonText}>Novo Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //Alert.alert('Funcionalidade do botão.');
              this.props.navigation.navigate('ColorForm');
            }}>
            <Text style={styles.buttonText}>Nova Cor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //Alert.alert('Funcionalidade do botão.');
              this.props.navigation.navigate('BrandForm');
            }}>
            <Text style={styles.buttonText}>Nova Marca</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Menu');
            }}>
            <Text style={styles.buttonText}>Voltar</Text>
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
