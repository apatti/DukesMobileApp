import React,{Component} from 'react';
import {View,FlatList,Text,RefreshControl} from 'react-native';
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
      data: []
    }
  }

  componentDidMount(){
      return fetch('https://tennisballcricket.com/teamplayerbrief/184')
        .then((response)=>response.json())
        .then((response)=>{
          //alert(JSON.stringify(response));
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

  renderFlatListItem(item)
  {
    return(
      <ListItem
        roundAvatar={true}
        avatar={<Avatar rounded icon={{name:'person'}}/>}
        title={item.Name}
        subtitle={item.Rolename}
        hideChevron={true}
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
