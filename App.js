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
import Players from './screens/players.js'
import {Icon} from 'react-native-elements';

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
      Players: {
        screen: Players,
        navigationOptions: {
          drawerLabel: 'Players',
          drawerIcon: ({tintColor,focused})=>(
            <Icon
              name="people"
              size={20}
              style={{color:tintColor}}
            />
          ),
        },
      },
      Team: {
        screen: AboutUs,
        navigationOptions: {
          drawerLabel: 'Team',
          drawerIcon: ({tintColor,focused})=>(
            <Icon
              name="sports-club"
              type="entypo"
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

export default RootDrawer;
