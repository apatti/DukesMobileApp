import React,{Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/dukestyles.js'
import DukesHeader from '../components/header.js';
import {FormLabel, FormInput, FormValidationMessage,Button,Icon} from 'react-native-elements';
import FBApp from '../util/db.js';

export default class Login extends Component {
  state = {email:'',password:'',loading:false,error:''};

  static navigationOptions = {
    drawerLabel: ()=>(FBApp.auth().currentUser?FBApp.auth().currentUser.displayName+' (Logout)':'Login'),
    drawerIcon: ()=>(FBApp.auth().currentUser?<Icon name="md-log-out" type='ionicon' size={20}/>:<Icon name="md-log-in" type='ionicon' size={20}/>)
  }

  componentWillMount()
  {
    if(FBApp.auth().currentUser)
    {
      FBApp.auth().signOut();
    }
  }

  onLoginPress()
  {
    this.setState({error:'',loading:true});
    const {email,password} = this.state;
    FBApp.auth().signInWithEmailAndPassword(email,password).then(
      ()=>{
        this.setState({error:'',loading:false});
        this.props.navigation.goBack();
      }
    ).catch((error)=>{this.setState({error:error.message,loading:false})});
  }

  render()
  {

    return(
      <View style={styles.container}>
        <DukesHeader title='Login' navigate={this.props.navigation.navigate}/>
        <FormLabel>Email</FormLabel>
        <FormInput
          keyboardType='email-address'
          placeholder="you@domain.com"
          value={this.state.email}
          onChangeText={email=>this.setState({email})}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry={true}
          placeholder="Please enter password..."
          value={this.state.password}
          onChangeText={password=>this.setState({password})}
        />
        <FormValidationMessage>
          {this.state.error}
        </FormValidationMessage>
        <Button
          small
          raised
          loading={this.state.loading}
          icon={{name:'md-log-in',type:'ionicon'}}
          title="Login"
          onPress={this.onLoginPress.bind(this)}
        />
      </View>
    );
  }
}
