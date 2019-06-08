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
import DatePicker from 'react-native-datepicker';

import CustomTextInput from 'rn-material-textinput';

export default class RentEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      cars: [],
      customerInfo: {
        value: this.props.navigation.getParam('item').customer.id,
      },
      carInfo: { value: this.props.navigation.getParam('item').car.id },
      price: this.props.navigation.getParam('item').price,
      date: this.props.navigation.getParam('item').rented_at,
      status: { value: this.props.navigation.getParam('item').status },
    };
  }

  componentDidMount() {
    this.loadCustomer();
    this.loadCars();
  }

  loadCustomer = async () => {
    const responseCustomer = await axios.get('/customer');

    const { customers } = responseCustomer.data;

    this.setState({ customers });
  };

  loadCars = async () => {
    const responseCars = await axios.get('/car');

    const { cars } = responseCars.data;

    this.setState({ cars });
  };

  handlePriceText = text => {
    this.setState({ price: parseFloat(text) });
  };

  handleChangeDropdowmCustomer = (value, index, data) => {
    this.setState({ customerInfo: data[index] });
  };

  handleChangeDropdowmCar = (value, index, data) => {
    this.setState({ carInfo: data[index] });
  };

  handleChangeDropdowmStatus = (value, index, data) => {
    this.setState({ status: data[index] });
  };

  render() {
    const customerOptions = this.state.customers.map(item => ({
      value: item.id,
      label: item.name,
    }));

    const carOptions = this.state.cars.map(item => ({
      value: item.id,
      label:
        item.brand.name +
        ' ' +
        item.brand.model +
        ' ' +
        item.color.name +
        ' ' +
        item.license,
    }));

    const statusOptions = [
      {
        value: 0,
        label: 'Orçamento',
      },
      {
        value: 1,
        label: 'Alugado',
      },
      {
        value: 2,
        label: 'Devolvido',
      },
      {
        value: 3,
        label: 'Cancelado',
      },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Novo Aluguel</Text>
          <Image source={logo} />
        </View>
        <View style={styles.container2}>
          <StatusBar barStyle="light-content" />

          <Dropdown
            label="Nome do Cliente"
            value={this.state.customerInfo.value}
            baseColor="#fff"
            itemColor="rgba(255,255,255,0.6)"
            textColor="#fff"
            containerStyle={styles.dropdownContainer}
            pickerStyle={styles.dropdownPicker}
            data={customerOptions}
            onChangeText={this.handleChangeDropdowmCustomer}
          />

          <Dropdown
            label="Carro"
            value={this.state.carInfo.value}
            baseColor="#fff"
            itemColor="rgba(255,255,255,0.6)"
            textColor="#fff"
            containerStyle={{ ...styles.dropdownContainer, marginBottom: 10 }}
            pickerStyle={styles.dropdownPicker}
            data={carOptions}
            onChangeText={this.handleChangeDropdowmCar}
          />

          <View>
            <DatePicker
              style={styles.datePickerStyle}
              date={this.state.date}
              mode="date"
              dateTextColor="#fff"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                dateText: {
                  color: '#fff',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
          </View>

          <View style={styles.customTextInputView}>
            <CustomTextInput
              label="Valor"
              value={this.state.price.toString()}
              autoFocus={true}
              onChangeText={this.handlePriceText}
              labelStyle={{
                color: '#ffffff',
                fontSize: 15,
              }}
              inputStyle={{
                color: '#ffffff',
                fontSize: 16,
                keyboardType: 'number-pad',
              }}
              focusedBorderBottomColor="#ffffff"
              unfocusedBorderBottomColor="#ffffff"
            />
          </View>

          <Dropdown
            label="Estado"
            value={this.state.status.value}
            baseColor="#fff"
            itemColor="rgba(255,255,255,0.6)"
            textColor="#fff"
            containerStyle={{ ...styles.dropdownContainer, marginBottom: 10 }}
            pickerStyle={styles.dropdownPicker}
            data={statusOptions}
            onChangeText={this.handleChangeDropdowmStatus}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await axios
                .put('/rent/' + this.props.navigation.getParam('item').id, {
                  customer_id: this.state.customerInfo.value,
                  car_id: this.state.carInfo.value,
                  rented_at: this.state.date,
                  status: this.state.status.value,
                  price: this.state.price,
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
              this.props.navigation.navigate('RentIndex');
            }}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('RentIndex');
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
    fontSize: 40,
    marginRight: 5,
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
    marginHorizontal: 40,
  },
  dropdownPicker: {
    backgroundColor: 'rgb(67, 124, 133)',
    borderRadius: 7,
  },
  customTextInputView: {
    marginHorizontal: 40,
  },
  datePickerStyle: {
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
