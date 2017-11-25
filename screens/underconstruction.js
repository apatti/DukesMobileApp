import React,{Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/dukestyles.js';
import DukesHeader from '../components/header.js';

export default class UnderConstruction extends Component {
  render(){
    var title='Under Construction';
    if(this.props.title)
    {
      title=this.props.title;
    }
    return(
      <View style={styles.container}>
        <DukesHeader title={title} navigate={this.props.navigate}/>
        <Text>COMING SOON!!!</Text>
        <Text>We're currently working on creating page.</Text>
        <Text>We'll be here soon, please do check back.</Text>
      </View>
    );
  }
}
