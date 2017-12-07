import React,{Component} from 'react';
import {View, Text,FlatList} from 'react-native';
import styles from '../styles/dukestyles.js';
import DukesHeader from '../components/header.js';
import NotTeamError from './NotTeamError.js'
import TakePoll from './takePoll.js';
import { StackNavigator } from 'react-navigation';
import FBApp from '../util/db.js';
import {ListItem} from 'react-native-elements';
import PollResults from './pollResults.js';


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

  componentWillUnmount()
  {
    this.pollsRef.off();
  }

  getPolls()
  {
    this.pollsRef.orderByChild("isClosed").equalTo(true).on('value',(snapshot)=>this.loadPolls(snapshot));
  }

  loadPolls(snapshot)
  {
    var polls=[];
    snapshot.forEach((child)=>{
      if(child.val().isClosed)
      {
        //TODO: need to remove unnecessary stuff
        polls.push({
          title:child.val().title,
          tcaGameId:child.val().tcaGameId,
          eventDate:child.val().eventDate,
          eventTime:child.val().eventTime,
          eventDay:child.val().eventDay,
          options:child.val().options,
          key:child.key
        });
      }
    });
    if(polls.length==0)
    {
      polls.push({title:"No closed polls",key:-1});
    }
    this.setState({
      polls:polls
    });
  }

  onPollItemPress(item)
  {
    if(item.key!=-1)
      this.props.navigation.navigate('PollResults',{pollItem:item});
  }

  renderFlatListItem(item)
  {
    return(
      <ListItem title={item.title}
       onPress={this.onPollItemPress.bind(this,item)}
       hideChevron={item.key==-1}
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
        <DukesHeader title='Closed Polls' navigate={this.props.screenProps}/>
        <FlatList data={this.state.polls}
          renderItem={({item})=>this.renderFlatListItem(item)}
          />
      </View>
    );
  }
}

const ClosedPolls = StackNavigator(
  {
    PollList: {
      screen: PollList,
    },
    PollResults:{
      screen: PollResults,
    },
  }
);

export default ClosedPolls;
