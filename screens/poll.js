import React,{Component} from 'react';
import {View, Text} from 'react-native';
import UnderConstruction from './underconstruction.js';
import DukesHeader from '../components/header.js';

export default class Poll extends Component {
  render(){
    return(
      <UnderConstruction navigate={this.props.navigation.navigate}/>
    );
  }
}
