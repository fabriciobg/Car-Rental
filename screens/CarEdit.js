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

import { Dropdown } from 'react-native-material-dropdown';
import CustomTextInput from 'rn-material-textinput';
//import SearchableDropdown from 'react-native-searchable-dropdown';

export default class CarEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
      brands: [],
      colorInfo: { value: this.props.navigation.getParam('item').color.id },
      brandInfo: { value: this.props.navigation.getParam('item').brand.id },
      license: this.props.navigation.getParam('item').license,
    };
  }

  componentDidMount() {
    this.loadColors();
    this.loadBrands();
  }

  loadColors = async () => {
    const responseColors = await axios.get('/color');

    const { colors } = responseColors.data;

    this.setState({ colors });
  };

  loadBrands = async () => {
    const responseBrands = await axios.get('/brand');

    const { brands } = responseBrands.data;

    this.setState({ brands });
  };

  handleLicenseText = text => {
    this.setState({ license: text.toUpperCase() });
  };

  handleChangeDropdowmColor = (value, index, data) => {
    //console.log('| Value: ' + value + ' | Index: ' + index + ' | Data: ' + JSON.stringify(data).value + ' |');
    // this.setState({ colorInfo: value });
    this.setState({ colorInfo: data[index] });
  };

  handleChangeDropdowmBrand = (value, index, data) => {
    //console.log('| Value: ' + value + ' | Index: ' + index + ' | Data: ' + JSON.stringify(data).value + ' |');
    // this.setState({ brandInfo: value });
    this.setState({ brandInfo: data[index] });
  };

  render() {
    const colorOptions = this.state.colors.map(item => ({
      value: item.id,
      label: item.name,
    }));

    const brandOptions = this.state.brands.map(item => ({
      value: item.id,
      label: item.name + ' ' + item.model,
    }));

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Novo Carro</Text>
          <Image source={logo} />
        </View>
        <View style={styles.container2}>
          <StatusBar barStyle="light-content" />

          <View style={styles.customTextInputView}>
            <CustomTextInput
              label="Placa"
              value={this.state.license}
              onChangeText={this.handleLicenseText}
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

          <Dropdown
            label="Marca"
            baseColor="#fff"
            itemColor="rgba(255,255,255,0.6)"
            textColor="#fff"
            value={this.props.navigation.getParam('item').brand.id}
            containerStyle={styles.dropdownContainer}
            pickerStyle={styles.dropdownPicker}
            data={brandOptions}
            onChangeText={this.handleChangeDropdowmBrand}
          />

          <Dropdown
            label="Cor"
            baseColor="#fff"
            itemColor="rgba(255,255,255,0.6)"
            textColor="#fff"
            value={this.props.navigation.getParam('item').color.id}
            containerStyle={{ ...styles.dropdownContainer, marginBottom: 30 }}
            pickerStyle={styles.dropdownPicker}
            data={colorOptions}
            onChangeText={this.handleChangeDropdowmColor}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await axios
                .put('/car/' + this.props.navigation.getParam('item').id, {
                  license: this.state.license,
                  color_id: this.state.colorInfo.value,
                  brand_id: this.state.brandInfo.value,
                })
                .then(function(response) {
                  console.log(response.data);
                  console.log(response.status);
                  Alert.alert('', 'Item editado com sucesso.');
                })
                .catch(function(error) {
                  // handle error
                  console.log(error);
                  Alert.alert(error);
                });
              this.props.navigation.navigate('CarIndex');
            }}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('CarIndex');
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
    fontSize: 45,
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
  dropdownContainer: {
    marginHorizontal: 70,
  },
  dropdownPicker: {
    backgroundColor: 'rgb(67, 124, 133)',
    borderRadius: 7,
  },
  customTextInputView: {
    marginHorizontal: 70,
  },
});
