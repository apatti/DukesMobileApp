import React,{Component} from 'react';
import {View, Text,FlatList,TextInput,Switch} from 'react-native';
import UnderConstruction from './underconstruction.js';
import {CheckBox,ListItem,Icon,Divider} from 'react-native-elements';
import FBApp from '../util/db.js';
import styles from '../styles/dukestyles.js';
import DatePicker from 'react-native-datepicker'

export default class TakePoll extends Component {
  static navigationOptions = {
    title: 'Take poll',
  }

  constructor(props){
    super(props);
    this.state={selectedIndex:1,pollItem:{},pollResults:{}};
  }

  componentDidMount()
  {
    this.pollRef = FBApp.database().ref('/polls/'+this.props.navigation.state.params.pollId);
    this.loadPoll = this.loadPoll.bind(this);
    this.pollRef.on('value',(snapshot)=>this.loadPoll(snapshot));
  }

  componentWillUnmount()
  {
    this.pollRef.off();
    //this.optionResultRef.off();
    //alert("Unmounted");
  }

  loadPoll(snapshot)
  {
    var pollItemObj={
      title:snapshot.val().title,
      endDate:snapshot.val().endDate,
      endDay:snapshot.val().endDay,
      endTime:snapshot.val().endTime,
      tcaGameId:snapshot.val().tcaGameId,
      eventDate:snapshot.val().eventDate,
      eventTime:snapshot.val().eventTime,
      eventDay:snapshot.val().eventDay,
      options:snapshot.val().options,
      multiSelect:snapshot.val().multiSelect,
      key:snapshot.key
    };
    this.setState({pollItem:pollItemObj});
    results={};

    for(let pollOption of pollItemObj.options)
    {
      results[pollOption.title]=[];
      var childRef = this.pollRef.child("/options/"+pollOption.key+"/results");
      childRef.on('child_added',function(data){
        results[pollOption.title].push({"id":data.key,"email":data.val().email,"optionKey":pollOption.key});
      });
      childRef.on('child_removed',function(data){
        results[pollOption.title]=results[pollOption.title].filter(item=>item.id!==data.key);
      });
    }
    this.setState({pollResults:results});
  }

  changeOption(item,checked,resultKey)
  {
    this.optionResultRef = this.pollRef.child('options/'+item.key+'/results/');
    if(checked)
    {
      if(!this.state.pollItem.multiSelect)
      {
        pollResults = this.state.pollResults;
        for(var key in pollResults)
        {
          if(key!==item.title)
          {
            for(let user of pollResults[key])
            {
              this.pollRef.child('options/'+user.optionKey+'/results/'+user.id).remove();
            }
          }
        }
        this.pollRef.child('options/'+item.key+'/results/'+resultKey).remove();
      }
      this.optionResultRef.push({
        email:FBApp.auth().currentUser.email,
        name:FBApp.auth().currentUser.displayName,
        uid:FBApp.auth().currentUser.uid
      });
    }
    else {
        if(resultKey!='')
          this.pollRef.child('options/'+item.key+'/results/'+resultKey).remove();
    }
  }

  renderOptionsFlatListItem(item)
  {
    if(item.title!='Add another option')
    {
      var voteCount=0;
      var checked=false;
      var checkedIcon='dot-circle-o';
      var uncheckedIcon='circle-o';
      var resultKey='';
      var pollResult = (this.state.pollResults!=undefined)?this.state.pollResults[item.title]:null;
      if(pollResult)
      {
        voteCount = pollResult.length;
        var resultKey='';
        for(let user of pollResult)
        {
          if(FBApp.auth().currentUser.email==user.email)
          {
            checked=true;
            resultKey = user.id;
            //alert(resultKey);
          }
        }
        if(this.state.pollItem.multiSelect)
        {
          checkedIcon='check-square-o';
          uncheckedIcon='square-o';
        }
      }
      return(
        <ListItem title={<View style={styles.container}>
            <CheckBox title={item.title} checked={checked} checkedIcon={checkedIcon} uncheckedIcon={uncheckedIcon}
            onIconPress={this.changeOption.bind(this,item,!checked,resultKey)}/>
          </View>} badge={{value:voteCount,
                          textStyle: { color: 'orange' },
                          containerStyle: { marginTop: 15 }}} hideChevron={true}/>
      );
    }
  }

  render(){
    pollItem = this.state.pollItem;
    return(
      <View style={styles.container}>
        <Text style={styles.pollTitle}>{pollItem.title}</Text>
        <View>
        <FlatList data={pollItem.options}
          renderItem={({item})=>this.renderOptionsFlatListItem(item)}
          />
        </View>
        <Text>Poll results </Text>

      </View>
    );
  }
}
