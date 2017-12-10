import React,{Component} from 'react';
import {View,FlatList,Text} from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import UnderConstruction from './underconstruction.js';
import DukesHeader from '../components/header.js';
import styles from '../styles/dukestyles.js';

export default class InActivePlayers extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      isLoading:true,
      data: []
    }
  }

  componentDidMount(){
      return fetch('https://tennisballcricket.com/teamplayerbrief/true/184')
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

  renderFlatListItem(item)
  {
    return(
      <ListItem
        roundAvatar={true}
        title={item.Name}
        avatar={<Avatar rounded icon={{name:'person'}}/>}
        hideChevron={true}
      />
    );
  }

  render(){
    return(
      <View style={styles.container}>
      <DukesHeader title='Inactive Players' navigate={this.props.screenProps}/>
      <FlatList data={this.state.data}
        renderItem={({item})=>this.renderFlatListItem(item)}
        keyExtractor={item=>item.PlayerId}
        />
      </View>
    );
  }
}
