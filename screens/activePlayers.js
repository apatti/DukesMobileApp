import React,{Component} from 'react';
import {View,FlatList,Text,RefreshControl,Linking} from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import UnderConstruction from './underconstruction.js';
import DukesHeader from '../components/header.js';
import styles from '../styles/dukestyles.js';

export default class ActivePlayers extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      isLoading:true,
      data: [],
    }
  }

  componentDidMount(){
      return fetch('https://tennisballcricket.com/teamplayerbrief/184')
        .then((response)=>response.json())
        .then((response)=>{
          this.setState({
            data:response,
            isLoading: false,
          });
        })
        .catch(error=>{
          alert(error);
          this.setState({
            isLoading:false
          });
        });
  }

  renderAvatar(role)
  {
    switch (role) {
      case 'WicketKeeper':
        return(
          require('../images/wicket_keeper.png')
        );
        break;
      case 'Captain':
      case 'Vice Captain':
        return(
          require('../images/cricket_captain.png')
        );
        break;
      case 'Team Manager':
        return(
          require('../images/dukes_logo_red.png')
        );
        break;
      default:
        return(
          require('../images/cricket_player.png')
        );
        break;
    }
  }

  playerClick(item)
  {
    Linking.openURL("https://tennisballcricket.com/player?id="+item.PlayerId);
  }

  renderFlatListItem(item)
  {
    return(
      <ListItem
        roundAvatar={true}
        avatar={this.renderAvatar(item.Rolename)}
        title={item.Name}
        subtitle={item.Rolename}
        hideChevron={true}
        onPress={()=>{Linking.openURL("https://tennisballcricket.com/player?id="+item.PlayerId);}}
      />
    );
  }

  render(){
    return(
      <View style={styles.container}>
      <DukesHeader title='Active Players' navigate={this.props.screenProps}/>
      <FlatList data={this.state.data}
        renderItem={({item})=>this.renderFlatListItem(item)}
        keyExtractor={item=>item.PlayerId}
        refreshControl={<RefreshControl refreshing={this.state.isLoading}/>}
        />
      </View>
    );

  }
}
