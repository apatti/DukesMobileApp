import React,{Component} from 'react';
import {View, Text} from 'react-native';
import UnderConstruction from './underconstruction.js';
import DukesHeader from '../components/header.js';

export default class AdminPlaying extends Component {
  render(){
    return(
      <UnderConstruction title='Playing XI' navigate={this.props.screenProps}/>
    );
  }
}
