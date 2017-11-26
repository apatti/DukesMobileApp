import React,{Component} from 'react';
import {TabNavigator} from "react-navigation";
import AdminPoll from './adminPoll.js';
import AdminPlaying from './adminPlaying.js';
import AdminPlayer from './adminPlayer.js';
import {Icon} from 'react-native-elements';
import FBApp from '../util/db.js';
import NotTeamError from './NotTeamError.js';

export default class Admin extends Component
{
  state = {isAdmin:false};

  componentWillMount()
  {
    var user = FBApp.auth().currentUser;
    if(user!=null)
    {
      FBApp.database().ref('users/'+user.uid+'/isAdmin').on('value',(snapshot)=>{this.setState({isAdmin:snapshot.val()})});
    }
  }

  render(){

    if(this.state.isAdmin)
    {
      alert('Logged In');
      const Tabs = TabNavigator({
          Poll: {
            screen:AdminPoll,
            navigationOptions:{
              tabBarLabel:'Poll',
              tabBarIcon:()=>(<Icon name="poll" size={15}/>)
            }
          },
          PlayingXI: {
            screen:AdminPlaying,
            navigationOptions:{
              tabBarLabel:'Playing XI',
              tabBarIcon:()=>(<Icon name="people" size={15}/>)
            }
          },
          Player: {
            screen:AdminPlayer,
            navigationOptions:{
              tabBarLabel:'Player',
              tabBarIcon:()=>(<Icon name="person-add" size={15}/>)
            }
          },
        });
      return(<Tabs screenProps={this.props.navigation.navigate}/>);
    }
    else {
      alert('Not log in');
      return(<NotTeamError navigate={this.props.navigation.navigate}/>);
    }
  }
}
