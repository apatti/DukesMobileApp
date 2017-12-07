import React,{Component} from 'react';
import {View, Text,FlatList,TextInput,SectionList,Header} from 'react-native';
import UnderConstruction from './underconstruction.js';
import {CheckBox,ListItem,Icon,Divider} from 'react-native-elements';
import FBApp from '../util/db.js';
import styles from '../styles/dukestyles.js';
import DatePicker from 'react-native-datepicker'

export default class PollResults extends Component {
  static navigationOptions = {
    title: 'Poll Results',
  }

  constructor(props){
    super(props);
    var pollItem = this.props.navigation.state.params.pollItem;
    this.state={selectedIndex:1,pollItem:pollItem,resultSection:[]};
    this.pollRef = FBApp.database().ref('/polls/'+this.props.navigation.state.params.pollItem.key);
  }

  componentDidMount()
  {
    results={};
    var pollItemObj=this.state.pollItem;
    for(let pollOption of pollItemObj.options)
    {
      results[pollOption.title]=[];
      var childRef = this.pollRef.child("/options/"+pollOption.key+"/results");
      childRef.on('child_added',function(data){
        results[pollOption.title].push({"key":data.key,"email":data.val().email,"name":data.val().name,"optionKey":pollOption.key});
      });
      childRef.on('child_removed',function(data){
        results[pollOption.title]=results[pollOption.title].filter(item=>item.key!==data.key);
      });
    }
    resultSection = [];
    for(let pollOption of pollItemObj.options)
    {
      if(pollOption.title=='Add another option')
        continue;
      pollResult = {};
      pollResult['title'] = pollOption.title;
      pollResult['data'] = [];
      for(let user of results[pollOption.title])
      {
        pollResult['data'].push({'name':user.name,'email':user.email,'key':user.key});
      }
      resultSection.push(pollResult);
    }
    this.setState({resultSection:resultSection});
  }


  render(){
    pollItem = this.state.pollItem;
    return(
      <View style={styles.container}>
        <Text style={styles.pollTitle}>{pollItem.title}</Text>
        <SectionList
          renderItem={({item})=><ListItem title={item.name} hideChevron={true}/>}
          renderSectionHeader={({section}) => <View><Text style={styles.resultsTitle}> {section.title}</Text></View>}
          sections={this.state.resultSection}
        />
      </View>
    );
  }
}
