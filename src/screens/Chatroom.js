import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import database from '@react-native-firebase/database';
import {isEmpty} from '../constants/functions';
const {width: WIDTH} = Dimensions.get('window');
function TimeStampChanges(unix_timestamp) {
  var date = new Date(unix_timestamp);
  var hours = date.getHours();
  var minutes = '0' + date.getMinutes();
  var formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}
export class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      MessageList: [],
      UserID: this.props.route.params.Name,
    };
  }

  async componentDidMount() {
    console.log(this.state.UserID);
    let Data = [];

    database()
      .ref('messages')
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            MessageList: [...prevState.MessageList, value.val()],
          };
        });
      });
    setTimeout(() => {
      this.flatlist.scrollToEnd();
    });
  }

  sendMessage = async () => {
    Keyboard.dismiss();
    if (this.state.message.length > 0) {
      database().ref('messages').push({
        message: this.state.message,
        time: database.ServerValue.TIMESTAMP,
        from: this.state.UserID,
      });
      Keyboard.dismiss();
      this.setState({message: ''});
    }
  };

  renderDayRow = ({item}) => {
    if (item.message) {
      if (item.from != this.state.UserID) {
        return (
          <View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: '70%', padding: 10}}>
                <Text
                  style={{
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,

                    padding: 10,
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  {item.message}
                </Text>
              </View>

              <View style={{width: '30%', padding: 10}}>
                <Text
                  style={{
                    left: 10,
                    fontSize: 8,
                    bottom: 0,
                  }}>
                  {item.from} at {TimeStampChanges(item.time)}
                </Text>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: '30%'}}>
                <Text
                  style={{
                    left: 10,
                    fontSize: 8,
                    bottom: 0,
                  }}>
                  {item.from} at {TimeStampChanges(item.time)}
                </Text>
              </View>
              <View style={{width: '70%', padding: 10}}>
                <Text
                  style={{
                    backgroundColor: 'rgba(76, 252, 129,0.8)',
                    padding: 10,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                  }}>
                  {item.message}
                </Text>
              </View>
            </View>
          </View>
        );
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#000', height: '4%'}}></View>

        <View style={{backgroundColor: '#f4f4f8'}}>
          <View
            style={{
              marginTop: hp('1%'),
              marginBottom: hp('2%'),
              marginHorizontal: wp('5%'),
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack(null);
              }}>
              <View style={{marginTop: 10}}>
                <AntDesign name="arrowleft" color="#b1b1b1" size={26} />
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              position: 'absolute',
              top: 12,
              fontSize: 25,
              fontWeight: '300',
            }}>
            Chat
          </Text>
        </View>

        <ScrollView>
          <FlatList
            pagingEnabled
            ref={ref => {
              this.flatlist = ref;
            }}
            data={this.state.MessageList}
            renderItem={this.renderDayRow}
            keyExtractor={item => item.id}
          />
        </ScrollView>

        <KeyboardAvoidingView behavior="position">
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#f4f4f8',
              height: hp('9%'),
              marginBottom: hp('1%'),
              padding: 7,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', paddingRight: 12}}></View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholder={'Type a message'}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    padding: 10,
                    height: hp('7%'),
                    width: wp('85%'),
                  }}
                  onChangeText={message => this.setState({message})}
                  placeholder="Type a message "
                  multiline={true}
                  value={this.state.message}
                />
              </View>

              <View style={{flexDirection: 'row', marginLeft: wp('3.5%')}}>
                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => this.sendMessage()}>
                    <FontAwesome
                      name="paper-plane"
                      type="font-awesome"
                      color="#5f5d70"
                      size={22}
                      containerStyle={{width: '10%'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        {/*Model Upload Show */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: '#7C0003',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
  },
  userList: {
    padding: 8,
    backgroundColor: 'white',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  country: {
    fontSize: 14,
  },
  login: {
    fontSize: 11,
    color: 'gray',
  },
  profile: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 12,
    color: '#7c0003',
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 15,
    borderRadius: 50,
    marginTop: -5,
  },
  flag: {
    fontWeight: 'bold',
    width: 23,
    height: 23,
    color: 'white',
    backgroundColor: '#7C0003',
    borderRadius: 50,
    paddingLeft: 7,
    paddingTop: 1,
    marginLeft: wp('30%'),
    marginTop: wp('3%'),
  },
  input: {
    marginHorizontal: wp('1%'),
    backgroundColor: '#fff',
    padding: 10,
    width: '80%',
    height: 40,
    borderRadius: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 200,
    width: 200,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: '300',
  },
});

export default Chatroom;
