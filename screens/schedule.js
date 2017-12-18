import React,{Component} from 'react';
import {View,FlatList,Text,RefreshControl,SectionList,ScrollView,Linking} from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import UnderConstruction from './underconstruction.js';
import DukesHeader from '../components/header.js';
import styles from '../styles/dukestyles.js';
import {Icon,Card} from 'react-native-elements';

export default class Schedule extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      isLoading:true,
      data: []
    }
  }

  componentDidMount(){
      return fetch('https://tennisballcricket.com/getMatchSyncData?teamId=184')
        .then((response)=>response.json())
        .then((response)=>{
          var playingGame=[];
          var umpiringGame=[];
          if(response['Record']==null)
          {
            response['Record'] = [];
            playingGame=[{Name:"No games"}];
            umpiringGame=[{Name:"No games"}];
          }
          for(let match of response['Record'])
          {
            if(match['BatTeamId1_l']==184||match['BatTeamId2_l']==184)
            {
              playingGame.push(match);
            }
            if(match['UmpTeamId1']==184||match['UmpTeamId2']==184)
            {
              umpiringGame.push(match);
            }
          }
          var scheduleSection=[];
          scheduleSection.push({title:'Game',data:playingGame});
          scheduleSection.push({title:'Umpiring',data:umpiringGame});
          this.setState({
            data:scheduleSection,
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

    renderSectionListItem(item)
    {
      if(item.Name=='No games')
      {
        return(
          <Card title={"No Games schedule"}>
          </Card>
        );
      }
      var ump1Phone='tel:'+item.UmpConfirmationPhNoTeam1;
      var ump2Phone='tel:'+item.UmpConfirmationPhNoTeam2;
      var title = item.Name + " vs " + item.BatTeam2Name;
      return(
        <Card title={title}>
        <View>
                    <Text style={styles.tournamentName}>{item.TournamentName}({item.RoundName})</Text>
                    <Text >Date/Time: {item.MatchDate}</Text>
                    <Text >Venue: {item.PlaygroundName}</Text>
                    <Text>Address: {item.Address},{item.City}</Text>
                    <Text>Umpires: {item.UmpTeam1Name} & {item.UmpTeam2Name}</Text>
                    <View style={styles.umpireDetails}>
                      <Text>{item.UmpConfirmationPlayersTeam1}</Text>
                      {item.UmpConfirmationPhNoTeam1!='' &&
                        <View style={{flexDirection:'row'}}>
                        <Icon name='phone' size={15}/>
                        <Text style={styles.phoneNumber}
                              onPress={()=>Linking.openURL('tel:'+item.UmpConfirmationPhNoTeam1)}>
                              {item.UmpConfirmationPhNoTeam1}
                        </Text>
                        </View>
                      }
                      <Text>{item.UmpConfirmationPlayersTeam2}</Text>
                      {item.UmpConfirmationPhNoTeam2!='' &&
                        <View style={{flexDirection:'row'}}>
                        <Icon name='phone' size={15}/>
                        <Text style={styles.phoneNumber}
                              onPress={()=>Linking.openURL('tel:'+item.UmpConfirmationPhNoTeam2)}>
                              {item.UmpConfirmationPhNoTeam2}
                        </Text>
                        </View>
                      }
                    </View>
                  </View>
        </Card>
      );
    }

    render(){
      return(
        <ScrollView>
          <View style={styles.container}>
          <DukesHeader title='Schedule' navigate={this.props.navigation.navigate}/>
          <SectionList
            renderItem={({item})=>this.renderSectionListItem(item)}
            renderSectionHeader={({section}) => <View><Text style={styles.resultsTitle}> {section.title}</Text></View>}
            sections={this.state.data}
            keyExtractor={item=>item.MatchId}
            refreshControl={<RefreshControl refreshing={this.state.isLoading}/>}
          />
          </View>
        </ScrollView>
      );
    }
}
