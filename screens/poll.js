import React,{Component} from 'react';
import {TabNavigator} from "react-navigation";
import OpenPolls from './openPolls.js';
import ClosedPolls from './closedPolls.js';
import {Icon} from 'react-native-elements';
import FBApp from '../util/db.js';
import NotTeamError from './NotTeamError.js';

export default class Poll extends Component
{
  render(){

    if(FBApp.auth().currentUser!=null)
    {
      //alert('Logged In');
      const Tabs = TabNavigator({
          OpenPolls: {
            screen:OpenPolls,
            navigationOptions:{
              tabBarLabel:'Open Polls',
              tabBarIcon:()=>(<Icon name="poll" size={15}/>)
            }
          },
          ClosePolls: {
            screen:ClosedPolls,
            navigationOptions:{
              tabBarLabel:'Closed Polls',
              tabBarIcon:()=>(<Icon name="poll" size={15}/>)
            }
          },
        });
      return(<Tabs screenProps={this.props.navigation.navigate}/>);
    }
    else {
      //alert('Not log in');
      return(<NotTeamError navigate={this.props.navigation.navigate}/>);
    }
  }
}
