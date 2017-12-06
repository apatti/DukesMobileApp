import React,{Component} from 'react';
import {View, Text,FlatList,TextInput,Switch} from 'react-native';
import UnderConstruction from './underconstruction.js';
import {FormLabel, FormInput, FormValidationMessage,Button,ListItem,Icon,Divider} from 'react-native-elements';
import FBApp from '../util/db.js';
import styles from '../styles/dukestyles.js';
import DatePicker from 'react-native-datepicker'

export default class PollEdit extends Component {
  static navigationOptions = {
    title: 'Poll Add/Edit',
  }

  constructor(props)
  {
    super(props);
    this.state={
      poll_options:[],
      loading:false,
      error:false,
      title:'',
      endDateFull:'',
      endDate:'',
      endDay:'',
      endTime:'',
      multiSelect:false,
      isClosed:false,
      isUpdate:false,
    };
    this.changeOptionText = this.changeOptionText.bind(this);
    this.changeMultiSelect = this.changeMultiSelect.bind(this);
  }

  componentDidMount()
  {
    this.setUpInitialPollOptions();
  }

  setUpInitialPollOptions()
  {
    //MMMM Do YYYY, h:mm:ss a
    var pollItem = (this.props.navigation.state.params)?this.props.navigation.state.params.pollItem:null;
    if(!pollItem)
    {
      poll_options=[]
      poll_options.push({title:'Available',key:0,results:[]});
      poll_options.push({title:'Not Available',key:1,results:[]});
      poll_options.push({title:'Add another option',key:2,results:[]});
      this.setState({poll_options:poll_options});
    }
    else {
      this.setState({
        poll_options:pollItem.options,
        loading:false,
        error:false,
        title:pollItem.title,
        endDate:pollItem.endDate,
        endDay:pollItem.endDay,
        endTime:pollItem.endTime,
        multiSelect:pollItem.multiSelect,
        isClosed:pollItem.isClosed,
        key:pollItem.key,
        isUpdate:true
      });
    }
  }

  renderFlatListItem(item)
  {
    if(item.title=='Add another option')
    {
      return(
        <ListItem title={<View style={styles.container}>
            <Text onPress={this.onNewPollOption.bind(this)}>{item.title}</Text>
          </View>} leftIcon={{name:"add"}}
         hideChevron={true}/>
      );
    }
    else {
      return(
        <ListItem title={<View style={styles.container}>
            <TextInput value={item.title} onChangeText={title=>this.changeOptionText(item,title)}/>
          </View>} leftIcon={{name:"radio-button-unchecked"}} hideChevron={true}/>
      );
    }

  }
  changeMultiSelect()
  {
    this.setState((state)=>{
      multiSelect=state.multiSelect;
      return {multiSelect};
    });
  }

  changeOptionText(item,title)
  {
    this.setState((state)=>{
      const poll_options=state.poll_options.map(
        poll_option=>{
          poll_option = Object.assign({},poll_option);
          if(poll_option.key===item.key){
            poll_option.title=title;
          }
          return poll_option;
        }
      );
      return {poll_options};
    });
  }

  onNewPollOption()
  {
    var poll_options = Object.assign([], this.state.poll_options);
    length=poll_options.length;
    poll_option = poll_options[length-1];
    poll_options[length-1]={title:'New option',key:length-1,results:[]};
    poll_option.key+=1;
    poll_options.push(poll_option);
    this.setState({poll_options:poll_options});
    //alert(this.state.poll_options.length);
  }

  onClosePress()
  {
    if(this.state.isUpdate)
    {
      FBApp.database().ref('/polls/'+this.state.key).update({isClosed:true});
      alert("Poll is closed!");
      this.props.navigation.goBack();
    }
  }

  onSavePress()
  {
    dbRecord={
      title:this.state.title,
      endDate:this.state.endDate,
      endDay:this.state.endDay,
      endTime:this.state.endTime,
      createdBy:FBApp.auth().currentUser.displayName,
      isClosed:this.state.isClosed,
      tcaGameId:0,
      multiSelect: this.state.multiSelect,
      eventDate:'child.val().eventDate',
      eventTime:'child.val().eventTime',
      eventDay:'child.val().eventDay',
      options:this.state.poll_options
    };
    if(this.state.isUpdate)
    {
      FBApp.database().ref('/polls/'+this.state.key).set(dbRecord);
    }
    else {
      FBApp.database().ref('/polls/').push(dbRecord);
    }
    alert("Poll is created!!");
    this.props.navigation.goBack();
  }

  render(){
    return(
      <View style={styles.container}>
        <FormLabel>Title</FormLabel>
        <FormInput
          placeholder="Poll title"
          value={this.state.title}
          onChangeText={title=>this.setState({title})}
        />
        <FormLabel>Poll options </FormLabel>
        <View>
        <FlatList data={this.state.poll_options}
          renderItem={({item})=>this.renderFlatListItem(item)}
          />
        </View>
        {this.state.poll_options.length>3 &&
          <View>
          <View style={{alignItems:'flex-end',flexDirection: 'row',margin: 10,}}>
            <Text style={{marginLeft:10,marginRight:10}}>Single Choice</Text>
            <Switch value={this.state.multiSelect} onValueChange={(value)=>{this.setState({multiSelect:value})}} />
          </View>
          <Divider style={{ backgroundColor: 'grey' }}/>
          </View>
        }
        <FormLabel>Poll close date</FormLabel>
        <View style={{flexDirection:'row',margin:10,}}>
        <Text>{this.state.endTime} {this.state.endDay} {this.state.endDate}</Text>
        <DatePicker
          date={this.state.endDateFull}
          mode="datetime"
          placeholder="Poll end date"
          format="MM/DD/YY;dddd;h:mm a"
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          hideText={true}
          onDateChange={(newDate)=>{this.setState({
            endDateFull:newDate,
            endDate:newDate.split(';')[0],
            endDay:newDate.split(';')[1],
            endTime:newDate.split(';')[2],
          })}}
        />
        </View>
        <Divider style={{ backgroundColor: 'grey', margin:5 }}/>
        <View style={{flexDirection: 'row',margin: 5,justifyContent:'center'}}>
        <Button
          raised
          loading={this.state.loading}
          icon={{name:'save'}}
          title="Save"
          backgroundColor="darkturquoise"
          onPress={this.onSavePress.bind(this)}
        />
        <Button
          raised
          loading={this.state.loading}
          icon={{name:'close'}}
          title="Close Poll"
          backgroundColor="crimson"
          onPress={this.onClosePress.bind(this)}
        />
        </View>
      </View>
    );
  }
}
