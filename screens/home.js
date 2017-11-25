import React,{Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/dukestyles.js'
import DukesHeader from '../components/header.js';

export default class Home extends Component {
  render(){
    return(
      <View style={styles.container}>
        <DukesHeader title='About Us' navigate={this.props.navigation.navigate}/>
        <Text>Dukes XI</Text>
      </View>
    );
  }
}
