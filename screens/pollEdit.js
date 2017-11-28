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
      endDate:'',
      endDay:'',
      endTime:'',
      multiSelect:false,
      isClosed:false,
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
    poll_options=[]
    poll_options.push({title:'Available',key:0});
    poll_options.push({title:'Not Available',key:1});
    poll_options.push({title:'Add another option',key:2});
    this.setState({poll_options:poll_options});
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
      multi=state.multiSelect;
      return {multi};
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
    poll_options[length-1]={title:'New option',key:length-1};
    poll_option.key+=1;
    poll_options.push(poll_option);
    this.setState({poll_options:poll_options});
    //alert(this.state.poll_options.length);
  }

  onClosePress()
  {

  }

  onSavePress()
  {
    var endDateStrings =this.state.endDate.split(';');
    var endDate = endDateStrings[0];

    FBApp.database().ref('/polls/').push({
      title:this.state.title,
      endDate:endDateStrings[0],
      endDay:endDateStrings[1],
      endTime:endDateStrings[2],
      createdBy:'child.val().createdBy',
      isClosed:this.state.isClosed,
      tcaGameId:0,
      eventDate:'child.val().eventDate',
      eventTime:'child.val().eventTime',
      eventDay:'child.val().eventDay',
      options:this.state.poll_options
    });
    alert("Poll is created!!");
    this.props.navigation.navigate('PollManagement');
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
        <DatePicker
          date={this.state.endDate}
          mode="datetime"
          placeholder="Poll end date"
          format="MM/DD/YY;dddd;h:mm a"
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
          dateInput: {
            marginLeft: 15,
          }
          }}
          onDateChange={(date)=>{this.setState({endDate:date})}}
        />
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
