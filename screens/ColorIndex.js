import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Form,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
  StatusBar,
  Alert,
} from 'react-native';
import { Constants } from 'expo';

import axios from '../services/Axios';

export default class ColorIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
    };
  }

  componentDidMount() {
    this.loadColors();
  }

  loadColors = async () => {
    const response = await axios.get('/color');

    const { colors } = response.data;

    this.setState({ colors });
  };

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ ...styles.button, marginRight: 5 }}
          onPress={() => {
            this.props.navigation.navigate('ColorEdit', { item });
          }}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              'CONFIRMAÇÃO',
              'Esse processo irá deletar o item <' +
                item.name +
                '> da lista. O que deseja fazer?',
              [
                {
                  text: 'Deletar',
                  onPress: async () => {
                    await axios
                      .delete('/color/' + item.id)
                      .then(response => {
                        console.log(response);
                        console.log(response.status);
                        this.loadColors();
                      })
                      .catch(function(error) {
                        console.log(error);
                        Alert.alert(
                          'Erro',
                          'Não foi possível realizar essa ação.'
                        );
                      });
                  },
                },
                {
                  text: 'Cancelar',
                  onPress: () => {},
                },
              ],
              { cancelable: false }
            );
          }}>
          <Text style={styles.buttonText}>Apagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => this.props.navigation.navigate('ConsultMenu')}>
          <Text
            style={{
              ...styles.buttonText,
              fontSize: 12,
            }}>
            Voltar
          </Text>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.colors}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36485f',
  },
  list: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#496283',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#rgba(255,255,255,0.1)',
    padding: 20,
    marginBottom: 20,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonBack: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#rgba(89, 203, 189, 0.4)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#rgba(255,255,255,0.1)',
    marginRight: 280,
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Courier New',
    fontStyle: 'oblique',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'rgb(67, 124, 133)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#rgba(255,255,255,0.1)',
    padding: 5,
  },
});
