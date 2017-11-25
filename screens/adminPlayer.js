import React,{Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import DukesHeader from '../components/header.js';
import {ListItem,CheckBox} from 'react-native-elements';
import styles from '../styles/dukestyles.js';
import FBApp from '../util/db.js';
import NotTeamError from './NotTeamError.js';

export default class AdminPlayer extends Component {

  constructor(props){
    super(props);
    this.state={selectedIndex:1,data:[]};
    this.togglePlayerVerified = this.togglePlayerVerified.bind(this);
    this.togglePlayerIsAdmin = this.togglePlayerIsAdmin.bind(this);
    this.playersRef = FBApp.database().ref('/users/');
    this.listenForPlayers=this.listenForPlayers.bind(this);
  }

  loadPlayers(snapshot)
  {
    var players=[];
    snapshot.forEach((child)=>{
      players.push({
        displayName:child.val().displayName,
        email:child.val().email,
        phoneNumber:child.val().phoneNumber,
        isAdmin:child.val().isAdmin,
        isVerified:child.val().verified,
        key:child.key
      });
    });
    this.setState({
      data:players
    });
  }

  togglePlayerVerified(item)
  {
    this.setState((state)=>{
      const data=state.data.map(
        player=>{
          player = Object.assign({},player);
          if(player.key===item.key){
            player.isVerified=!player.isVerified;
            FBApp.database().ref('users/'+player.key+'/verified').set(player.isVerified);
          }
          return player;
        }
      );
      return {data};
    });
  }

  togglePlayerIsAdmin(item)
  {
    this.setState((state)=>{
      const data=state.data.map(
        player=>{
          player = Object.assign({},player);
          if(player.key===item.key){
            player.isAdmin=!player.isAdmin;
            FBApp.database().ref('/users/'+player.key).update({
              isAdmin:player.isAdmin
            });
          }
          return player;
        }
      );
      return {data};
    });
  }

  listenForPlayers(playersRef)
  {
    playersRef.on('value',(snapshot)=>this.loadPlayers(snapshot));
  }

  componentDidMount(){
    this.listenForPlayers(this.playersRef);
  }

  renderFlatListItem(item)
  {
    return(
      <ListItem title={item.displayName} subtitle={<View><Text>{item.email}</Text><Text>{item.phoneNumber}</Text></View>}
        badge={{element:<View>
          <CheckBox title="Approve" checked={item.isVerified} onPress={()=>this.togglePlayerVerified(item)}/>
          <CheckBox title="Admin" checked={item.isAdmin} onPress={()=>this.togglePlayerIsAdmin(item)}/>
                </View>}}
      />
    );
  }

  render(){
    if(FBApp.auth().currentUser==null)
    {
      return(
        <NotTeamError navigate={this.props.navigation.navigate}/>
      );
    }
    return(
      <View style={styles.container}>
      <DukesHeader title='Player Management' navigate={this.props.navigation.navigate}/>
      <FlatList data={this.state.data}
        renderItem={({item})=>this.renderFlatListItem(item)}
        />
      </View>
    );
  }
}
