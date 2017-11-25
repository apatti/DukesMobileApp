import React,{Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/dukestyles.js'
import UnderConstruction from './underconstruction.js';
import DukesHeader from '../components/header.js';
import {FormLabel, FormInput, FormValidationMessage,Button} from 'react-native-elements';
import FBApp from '../util/db.js';

export default class JoinUs extends Component {

  state = {email:'',password:'',re_password:'',first_name:'',last_name:'',phone:'',error:'',loading:false,verified:false};

  constructor(props)
  {
    super(props);
  }

  componentWillMount()
  {
    FBApp.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        FBApp.database().ref('/users/'+user.uid).once('value').then((snapshot)=>{
          if(snapshot.val())
          {
            this.setState({
              first_name:snapshot.val().firstName,
              last_name:snapshot.val().lastName,
              phone:snapshot.val().phoneNumber,
              email:snapshot.val().email,
              verified:snapshot.val().verified
            });
          }
        });
      }
    });
    var user = FBApp.auth().currentUser;
    if(user!=null)
    {
      FBApp.database().ref('users/'+user.uid+'/verified').on('value',(snapshot)=>{this.setState({verified:snapshot.val()})});
    }
  }

  onJoinPress()
  {
    this.setState({error:'',loading:true});
    if(this.state.first_name=='')
    {
      this.setState({error:'First name is required!!',loading:false});
      return;
    }
    if(this.state.last_name=='')
    {
      this.setState({error:'Last name is required!!',loading:false});
      return;
    }
    if(this.state.phone=='')
    {
      this.setState({error:'Phone number is required!!',loading:false});
      return;
    }
    if(this.state.email=='')
    {
      this.setState({error:'Email is required!!',loading:false});
      return;
    }
    if(this.state.password=='')
    {
      this.setState({error:'Password is required!!',loading:false});
      return;
    }
    if(this.state.password!=this.state.re_password)
    {
      this.setState({error:"Passwords don't match!!",loading:false});
      return;
    }
    const {email,password,first_name,last_name,phone} = this.state;
    FBApp.auth().createUserWithEmailAndPassword(email,password)
                .then((user)=>{
                  FBApp.database().ref('users/'+user.uid).set(
                    {
                      firstName:first_name,lastName:last_name,displayName:first_name+' '+last_name,
                      phoneNumber:phone,email:email,verified:false,isAdmin:false
                    }
                  );
                  user.updateProfile({displayName:first_name+" "+last_name,phoneNumber:phone}).then(()=>{
                    this.setState({error:"Request successfully submitted, please wait for confirmation from Team Management",loading:false});});
                  this.props.navigation.push('Login');
                })
                .catch((error)=>{
                  if(error.code=='auth/weak-password')
                  {
                    this.setState({error:"The password is too weak.",loading:false});
                  }
                  else {
                    this.setState({error:error.message,loading:false});
                  }
                });
  }

  render(){
    var message = '';
    //TODO: can we move this code block to componentWillMount?
    if(FBApp.auth().currentUser!=null)
    {
      if(this.state.verified)
      {
        message = 'Already part of the team!!';
      }
      else {
        message = "Request successfully submitted, please wait for confirmation from Team Management!!";
      }
    }
    else {
      message = this.state.error;
    }
    return(
      <View style={styles.container}>
        <DukesHeader title='Join Us' navigate={this.props.navigation.navigate}/>
        <FormLabel>First name</FormLabel>
        <FormInput
          placeholder="Please enter your first name..."
          value={this.state.first_name}
          onChangeText={first_name=>this.setState({first_name})}
        />
        <FormLabel>Last name</FormLabel>
        <FormInput
          placeholder="Please enter your last name..."
          value={this.state.last_name}
          onChangeText={last_name=>this.setState({last_name})}
        />
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          keyboardType='phone-pad'
          placeholder="Please enter your phone number..."
          value={this.state.phone}
          onChangeText={phone=>this.setState({phone})}
        />
        <FormLabel>Email Address</FormLabel>
        <FormInput
          keyboardType='email-address'
          placeholder="you@domain.com"
          value={this.state.email}
          onChangeText={email=>this.setState({email})}
        />
        {!FBApp.auth().currentUser &&
          <View>
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            placeholder="Please enter password..."
            value={this.state.password}
            onChangeText={password=>this.setState({password})}
          />
          <FormLabel>Re-enter Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            placeholder="Please re-enter password..."
            value={this.state.re_password}
            onChangeText={re_password=>this.setState({re_password})}
          />
          </View>
        }
        <FormValidationMessage>
          {message}
        </FormValidationMessage>
        <Button
          icon={{name:'done'}}
          title="Join"
          onPress={this.onJoinPress.bind(this)}
          disabled ={FBApp.auth().currentUser!=null}
          loading = {this.state.loading}
        />
      </View>
    );
  }
}
