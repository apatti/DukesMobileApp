import React,{Component} from 'react';
import {View, Text,FlatList} from 'react-native';
import DukesHeader from '../components/header.js';
import ActionButton from 'react-native-action-button';
import {ListItem} from 'react-native-elements';
import styles from '../styles/dukestyles.js';
import FBApp from '../util/db.js';
import Icon from 'react-native-vector-icons/Ionicons';
import NotTeamError from './NotTeamError.js';
import PollEdit from './pollEdit.js';
import { StackNavigator } from 'react-navigation';

class AdminPollManagement extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props)
  {
    super(props);

    this.state={
      loading:false,
      data:[],
      error:false,
      selectedIndex:1
    };
    this.pollsRef = FBApp.database().ref('/polls/');
    this.getPolls = this.getPolls.bind(this);
  }

  componentDidMount()
  {
    this.getPolls();
  }

  getPolls()
  {
    this.pollsRef.on('value',(snapshot)=>this.loadPolls(snapshot));
  }

  loadPolls(snapshot)
  {
    var polls=[];
    snapshot.forEach((child)=>{
      if(!child.val().isClosed)
      {
        //TODO: need to remove unnecessary stuff
        polls.push({
          title:child.val().title,
          endDate:child.val().endDate,
          endDay:child.val().endDay,
          endTime:child.val().endTime,
          createdBy:child.val().createdBy,
          isClosed:child.val().isClosed,
          tcaGameId:child.val().tcaGameId,
          eventDate:child.val().eventDate,
          eventTime:child.val().eventTime,
          eventDay:child.val().eventDay,
          options:child.val().options,
          multiSelect:child.val().multiSelect,
          key:child.key
        });
      }
    });
    this.setState({
      data:polls
    });
  }

  renderFlatListItem(item)
  {
    return(
      <ListItem title={item.title}
       subtitle={<View><Text>Poll ends on:{item.endTime}, {item.endDay},{item.endDate}</Text></View>}
       onPress={this.onPollItemPress.bind(this,item)}
      />
    );
  }

  onPollItemPress(item)
  {
    this.props.navigation.navigate('PollEdit',{pollItem:item});
  }

  newPollPress()
  {
    this.props.navigation.navigate('PollEdit');
  }

  render(){
    if(FBApp.auth().currentUser==null)
    {
      return(
        <NotTeamError navigate={this.props.navigation.navigate}/>
      );
    }
    return(
      <View style={styles.container}>
        <DukesHeader title='Poll Management' navigate={this.props.screenProps}/>
        <FlatList data={this.state.data}
          renderItem={({item})=>this.renderFlatListItem(item)}
          />
        <ActionButton buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item buttonColor='#9b59b6' title="New poll"
            onPress={this.newPollPress.bind(this)}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const AdminPoll = StackNavigator(
  {
    PollManagement: {
      screen: AdminPollManagement,
    },
    PollEdit:{
      screen: PollEdit,
    },
  }
);

export default AdminPoll;
