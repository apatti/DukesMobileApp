import React,{Component} from 'react';
import styles from '../styles/dukestyles.js';
import {Header} from 'react-native-elements';
import {View} from 'react-native';

export default class DukesHeader extends Component
{
    render(){
      return(
        <View>
          <Header
            leftComponent={{icon:'menu',color:'#fff',onPress:()=>this.props.navigate('DrawerOpen')}}
            centerComponent={{text:this.props.title,style:{color:'#fff'}}}
            rightComponent={{icon:'home',color:'#fff', onPress:()=>this.props.navigate('Home')}}
          />
        </View>
      );
    }
}
