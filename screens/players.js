import React,{Component} from 'react';
import {TabNavigator} from "react-navigation";
import ActivePlayers from './activePlayers.js';
import InActivePlayers from './inActivePlayers.js';
import {Icon} from 'react-native-elements';

export default class Players extends Component
{
  render(){
    const Tabs = TabNavigator({
        ActivePlayers: {
          screen:ActivePlayers,
          navigationOptions:{
            tabBarLabel:'Active Players',
            tabBarIcon:()=>(<Icon name="people" size={15}/>)
          }
        },
        InActivePlayers: {
          screen:InActivePlayers,
          navigationOptions:{
            tabBarLabel:'Inactive Players',
            tabBarIcon:()=>(<Icon name="people-outline" size={15}/>)
          }
        },
      },{tabBarPosition:'bottom',tabBarOptions:{showIcon:true}});
    return(<Tabs screenProps={this.props.navigation.navigate}/>);
    }
}
