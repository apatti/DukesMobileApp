import React,{Component} from 'react';
import {View, Text,FlatList} from 'react-native';
import styles from '../styles/dukestyles.js';
import DukesHeader from '../components/header.js';
import NotTeamError from './NotTeamError.js'
import TakePoll from './takePoll.js';
import { StackNavigator } from 'react-navigation';
import FBApp from '../util/db.js';
import {ListItem} from 'react-native-elements';


class PollList extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props)
  {
    super(props);

    this.state={
      polls:[],
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
    this.pollsRef.orderByChild("isClosed").equalTo(false).on('value',(snapshot)=>this.loadPolls(snapshot));
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
      polls:polls
    });
  }

  onPollItemPress(item)
  {
    this.props.navigation.navigate('TakePoll',{pollId:item.key});
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

  render(){
    if(FBApp.auth().currentUser==null)
    {
      return(
        <NotTeamError navigate={this.props.navigation.navigate}/>
      );
    }
    return(
      <View style={styles.container}>
        <DukesHeader title='Open Polls' navigate={this.props.screenProps}/>
        <FlatList data={this.state.polls}
          renderItem={({item})=>this.renderFlatListItem(item)}
          />
      </View>
    );
  }
}

export default class Poll extends Component{
  render()
  {
    if(FBApp.auth().currentUser==null)
    {
      return(
        <NotTeamError navigate={this.props.navigation.navigate}/>
      );
    }
    else {
      const PollStack = StackNavigator(
        {
          PollList: {
            screen: PollList,
          },
          TakePoll:{
            screen: TakePoll,
          },
        }
      );
      return(<PollStack screenProps={this.props.navigation.navigate}/>);
    }
  }
}
