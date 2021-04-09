import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {themes, colors} from '../constants/themes';
import {isEmpty} from '../constants/functions';
import AntDesign from 'react-native-vector-icons/AntDesign';
export class Home extends Component {
  constructor() {
    super();
    this.state = {
      Name: '',
    };
  }
  async componentDidMount() {
    const Login = await AsyncStorage.getItem('Login');
    const name = await AsyncStorage.getItem('Name');
    if (Login === 'OK') {
      this.props.navigation.navigate('Chatroom', {
        Name: name,
      });
    }
  }
  UserNameCheck = () => {
    if (!isEmpty(this.state.Name)) {
      AsyncStorage.setItem('Login', 'OK');
      AsyncStorage.setItem('Name', this.state.Name);
      this.props.navigation.navigate('Chatroom', {
        Name: this.state.Name,
      });
    } else {
      alert('Give Some Username first');
    }
  };
  render() {
    return (
      <View style={styles.cont}>
        <StatusBar backgroundColor={colors.BLUE.DEFAULT} />
        <View style={styles.circle}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Chat Box</Text>
        </View>
        <View style={styles.View}>
          <TextInput
            placeholder="Enter your name"
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={Name => this.setState({Name})}
          />
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.UserNameCheck()}>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  circle: {
    marginTop: '10%',
    height: 250,
    width: 250,
    borderRadius: 125,
    backgroundColor: colors.BLUE.LIGHT,
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  View: {
    padding: 8,
    height: 80,
    width: '90%',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 20,
    marginTop: '10%',
  },
  btn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BLUE.PRIMARY,
    marginTop: '5%',
    alignSelf: 'flex-end',
    marginHorizontal: '5%',
  },
});
