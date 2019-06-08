import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  Alert,
} from 'react-native';

import axios from '../services/Axios';

import logo from '../assets/rent64px.png';

import CustomTextInput from 'rn-material-textinput';

export default class CustomerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.navigation.getParam('item').name,
      phone: this.props.navigation.getParam('item').phone,
      address: this.props.navigation.getParam('item').address,
    };
  }

  handleName = text => {
    this.setState({ name: text });
  };

  handlePhone = text => {
    this.setState({ phone: text });
  };

  handleAddress = text => {
    this.setState({ address: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Novo Cliente</Text>
          <Image source={logo} />
        </View>
        <View style={styles.container2}>
          <StatusBar barStyle="light-content" />

          <View style={styles.customTextInputView}>
            <CustomTextInput
              label="Nome Completo"
              value={this.state.name}
              onChangeText={this.handleName}
              autoFocus={true}
              labelStyle={{
                color: '#ffffff',
                fontSize: 15,
              }}
              inputStyle={{
                color: '#ffffff',
                fontSize: 16,
              }}
              focusedBorderBottomColor="#ffffff"
              unfocusedBorderBottomColor="#ffffff"
            />
          </View>

          <View style={styles.customTextInputView}>
            <CustomTextInput
              label="Telefone"
              value={this.state.phone}
              onChangeText={this.handlePhone}
              autoFocus={true}
              labelStyle={{
                color: '#ffffff',
                fontSize: 15,
              }}
              inputStyle={{
                color: '#ffffff',
                fontSize: 16,
              }}
              focusedBorderBottomColor="#ffffff"
              unfocusedBorderBottomColor="#ffffff"
            />
          </View>

          <View style={{ ...styles.customTextInputView, marginBottom: 30 }}>
            <CustomTextInput
              label="Endereço"
              value={this.state.address}
              onChangeText={this.handleAddress}
              autoFocus={true}
              labelStyle={{
                color: '#ffffff',
                fontSize: 15,
              }}
              inputStyle={{
                color: '#ffffff',
                fontSize: 16,
              }}
              focusedBorderBottomColor="#ffffff"
              unfocusedBorderBottomColor="#ffffff"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await axios
                .put(
                  '/customer/' + this.props.navigation.getParam('item').id,
                  this.state
                )
                .then(function(response) {
                  console.log(response.data);
                  console.log(response.status);
                  Alert.alert('', 'Item modificado com sucesso.');
                })
                .catch(function(error) {
                  // handle error
                  console.log(error);
                  Alert.alert(error);
                });
              this.props.navigation.navigate('CustomerIndex');
            }}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('CustomerIndex');
            }}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 37,
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
  customTextInputView: {
    marginHorizontal: 70,
  },
});
