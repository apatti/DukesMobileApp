/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import JoinUs from './screens/joinus.js';
import Login from './screens/login.js';
import Home from './screens/home.js';
import AboutUs from './screens/aboutUs.js';
import Admin from './screens/admin.js';
import Poll from './screens/poll.js';
import Schedule from './screens/schedule.js';
import Team from './screens/team.js';
import {Icon} from 'react-native-elements';
import FBApp from './util/db.js';

export default class App extends Component
{
  state = {isAdmin:false,isVerified:false,isLoggedIn:false};

  onNavigationStateChange(p,c,a)
  {
    var user = FBApp.auth().currentUser;
    if(user!=null)
    {
      this.setState({isLoggedIn:true});
      FBApp.database().ref('/users/'+user.uid).once('value').then((snapshot)=>{
        if(snapshot.val())
        {
          this.setState({
            first_name:snapshot.val().firstName,
            last_name:snapshot.val().lastName,
            phone:snapshot.val().phoneNumber,
            email:snapshot.val().email,
            isVerified:snapshot.val().verified,
            isAdmin:snapshot.val().isAdmin
          });
          //alert(snapshot.val().isAdmin);
        }
      });
    }

    //alert(p);
  }
  render(){
    //alert(this.state.isAdmin);
    //ToDo: hacked to display Admin in the drawer.
    const RootDrawer = DrawerNavigator(
      {
        Home: {
          screen: Home,
          navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({tintColor})=>(
              <Icon
                name="home"
                size={20}
                style={{color:tintColor}}
              />
            ),
          },
        },
        Poll: {
          screen: Poll,
          navigationOptions: {
            drawerLabel: 'Poll',
            drawerIcon: ({tintColor,focused})=>(
              <Icon
                name='poll'
                size={20}
                />
            ),
          },
        },
        Schedule: {
          screen: Schedule,
          navigationOptions: {
            drawerLabel: 'Schedule',
            drawerIcon: ({tintColor,focused})=>(
              <Icon
                name="md-calendar"
                type='ionicon'
                size={20}
                style={{color:tintColor}}
              />
            ),
          },
        },
        Team: {
          screen: Team,
          navigationOptions: {
            drawerLabel: 'Team',
            drawerIcon: ({tintColor,focused})=>(
              <Icon
                name="people"
                size={20}
                style={{color:tintColor}}
              />
            ),
          },
        },
        AboutUs: {
          screen: AboutUs,
          navigationOptions: {
            drawerLabel: 'About us',
            drawerIcon: ({tintColor,focused})=>(
              <Icon
                name="md-megaphone"
                type="ionicon"
                size={20}
                style={{color:tintColor}}
              />
            ),
          },
        },
        login: {
          screen: Login,
          navigationOptions: {
            drawerIcon: ({tintColor,focused})=>(
              <Icon
                name="md-log-in"
                type='ionicon'
                size={20}
                style={{color:tintColor}}
              />
            ),
          },
        },
        JoinUs: {
          screen: JoinUs,
          navigationOptions: {
            drawerLabel: 'Join us',
            drawerIcon: ({tintColor,focused})=>(
              <Icon
                name="add-user"
                type='entypo'
                size={20}
                style={{color:tintColor}}
              />
            ),
          },
        },
      }
    );
    if(this.state.isAdmin)
    {
      const RootDrawer = DrawerNavigator(
      {
            Home: {
              screen: Home,
              navigationOptions: {
                drawerLabel: 'Home',
                drawerIcon: ({tintColor})=>(
                  <Icon
                    name="home"
                    size={20}
                    style={{color:tintColor}}
                  />
                ),
              },
            },
            Poll: {
              screen: Poll,
              navigationOptions: {
                drawerLabel: 'Poll',
                drawerIcon: ({tintColor,focused})=>(
                  <Icon
                    name='poll'
                    size={20}
                    />
                ),
              },
            },
            Schedule: {
              screen: Schedule,
              navigationOptions: {
                drawerLabel: 'Schedule',
                drawerIcon: ({tintColor,focused})=>(
                  <Icon
                    name="md-calendar"
                    type='ionicon'
                    size={20}
                    style={{color:tintColor}}
                  />
                ),
              },
            },
            Team: {
              screen: Team,
              navigationOptions: {
                drawerLabel: 'Team',
                drawerIcon: ({tintColor,focused})=>(
                  <Icon
                    name="people"
                    size={20}
                    style={{color:tintColor}}
                  />
                ),
              },
            },
            AboutUs: {
              screen: AboutUs,
              navigationOptions: {
                drawerLabel: 'About us',
                drawerIcon: ({tintColor,focused})=>(
                  <Icon
                    name="md-megaphone"
                    type="ionicon"
                    size={20}
                    style={{color:tintColor}}
                  />
                ),
              },
            },
            Admin: {
              screen: Admin,
              navigationOptions: {
                drawerLabel: 'Admin',
                drawerIcon: ({tintColor,focused})=>(
                  <Icon
                    name="lock"
                    size={20}
                    style={{color:tintColor}}
                  />
                ),
              },
            },
            login: {
              screen: Login,
              navigationOptions: {
                drawerIcon: ({tintColor,focused})=>(
                  <Icon
                    name="md-log-in"
                    type='ionicon'
                    size={20}
                    style={{color:tintColor}}
                  />
                ),
              },
            },
            JoinUs: {
              screen: JoinUs,
              navigationOptions: {
                drawerLabel: 'Join us',
                drawerIcon: ({tintColor,focused})=>(
                  <Icon
                    name="add-user"
                    type='entypo'
                    size={20}
                    style={{color:tintColor}}
                  />
                ),
              },
            },
      });
    }
    return(<RootDrawer onNavigationStateChange={this.onNavigationStateChange.bind(this)}/>);
  }
//export default RootDrawer;

}
