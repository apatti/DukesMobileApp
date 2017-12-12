import React,{Component} from 'react';
import {View, Text} from 'react-native';  
import styles from '../styles/dukestyles.js';
import DukesHeader from '../components/header.js';

export default class AboutUs extends Component {
  render(){
    return(
      <View style={styles.container}>
      <DukesHeader title='About Us' navigate={this.props.navigation.navigate}/>
      <View style={styles.aboutUsContainer}>
        <Text style={{fontStyle: "italic",fontSize:15,marginTop:20}}><Text style={{fontWeight: "bold",textDecorationLine:'underline'}}>Duke</Text> - A male holding the highest hereditary title in the British and certain other peerages.
          chiefly historical (in some parts of Europe) a male ruler of a small independent state.</Text>
        <Text><Text style={{fontWeight: "bold",textDecorationLine:'underline'}}>Informal:</Text> Rulers, Fighters.</Text>
        <Text style={{fontSize:10}}>Courtesy: Oxford Dictionary</Text>
        <Text style={styles.dukesIntro}>Right from the time the Dukes XI family has been established back in June 2010, we have strived
        hard to live up to our teams name and fight for everything when we go out onto the cricket field
        representing DUKES. Off the field we are a fun loving family who are either busy preparing their fantasy (IPL, NFL) teams or debating on whatsapp on all topics or polishing their poker skills or enjoying delicious food.
        </Text>
      </View>
      </View>
    );
  }
}
