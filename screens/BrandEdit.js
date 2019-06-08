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

export default class BrandEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.navigation.getParam('item').name,
      model: this.props.navigation.getParam('item').model,
    };
  }

  handleName = text => {
    this.setState({ name: text });
  };

  handleModel = text => {
    this.setState({ model: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Editar Marca</Text>
          <Image source={logo} />
        </View>
        <View style={styles.container2}>
          <StatusBar barStyle="light-content" />

          <View style={styles.customTextInputView}>
            <CustomTextInput
              label="Nome"
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
                autoCapitalize: 'none',
              }}
              focusedBorderBottomColor="#ffffff"
              unfocusedBorderBottomColor="#ffffff"
            />
          </View>

          <View style={{ ...styles.customTextInputView, marginBottom: 30 }}>
            <CustomTextInput
              label="Modelo"
              value={this.state.model}
              onChangeText={this.handleModel}
              autoFocus={true}
              labelStyle={{
                color: '#ffffff',
                fontSize: 15,
              }}
              inputStyle={{
                color: '#ffffff',
                fontSize: 16,
                autoCapitalize: 'none',
              }}
              focusedBorderBottomColor="#ffffff"
              unfocusedBorderBottomColor="#ffffff"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={ async () => {
              await axios
                .put('/brand/' + this.props.navigation.getParam('item').id, this.state)
                .then(function(response) {
                  console.log(response.data);
                  console.log(response.status);
                  Alert.alert(
                    '',
                    'Item editado com sucesso.'
                  );
                })
                .catch(function(error) {
                  // handle error
                  console.log(error);
                  Alert.alert(error);
                });
              this.props.navigation.navigate('BrandIndex');
            }}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('BrandIndex');
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
    fontSize: 38,
    marginRight: 15,
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
