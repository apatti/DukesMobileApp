import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  aboutUsContainer:{
    margin: 20,
  },
  dukesIntro:{
    marginTop:20,
    fontStyle:'italic',
    fontSize:15,
    color: '#333333',
  },
  container: {
    flex: 1,
    backgroundColor: 'floralwhite',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  dukesHeader:{
    marginTop:15
  },
  actionButtonIcon:{
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  pollTitle:{
    margin:20,
    fontSize:20,
    fontWeight:'bold',
  },
  resultsTitle:{
    marginLeft:10,
    marginTop:15,
    marginBottom:5,
    fontSize:15,
    fontWeight:'bold',
    color: 'brown',
  },
  resultItems:{
    marginLeft:20,
  },
  gameTitle:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:8
  },
  lessImportant:{
    fontSize:13,
    fontWeight:'500',
  },
  tournamentName:{
    fontSize:12,
    fontWeight:"100",
  },
  umpireDetails:{
    marginLeft:20,
  },
  phoneNumber:{
    color:'blue',
    fontWeight:"300"
  }

});

export default styles;
