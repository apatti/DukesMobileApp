import React,{Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/dukestyles.js'
import DukesHeader from '../components/header.js';

export default class NotTeamError extends Component {
  render(){
    var title='Not Authorized';
    if(this.props.title)
    {
      title=this.props.title;
    }
    return(
      <View style={styles.container}>
        <DukesHeader title={title} navigate={this.props.navigate}/>
        <Text>Restricted Page!!!</Text>
        <Text>Please join us ASAP</Text>
      </View>
    );
  }
}
