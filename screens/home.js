import React,{Component} from 'react';
import {View, Text,ScrollView} from 'react-native';
import styles from '../styles/dukestyles.js'
import DukesHeader from '../components/header.js';
import ImageSlider from 'react-native-image-slider';
import {Card,Avatar} from 'react-native-elements';

export default class Home extends Component {
  constructor(props) {
        super(props);

        this.state = {
            position: 1,
            isLoading:true,
            data: null,
            interval: null,
            images:[
                    require('../images/dukesNewCupAll.jpg'),
                    require('../images/dukesPassion.jpg'),
                    require('../images/dukesNewCupAll2.jpg'),
                    require('../images/dukes_frisbee.jpg'),
                    require('../images/dukes_frisbee2.jpg'),
                    require('../images/dukesVolleyBall1.jpg'),
                    require('../images/dukesVolleyBall2.jpg')]
        };
    }

  componentWillMount() {
      this.setState({interval: setInterval(() => {
          this.setState({position: this.state.position === this.state.images.length-1 ? 0 : this.state.position + 1});
      }, 5000)});
  }

  componentWillUnmount() {
        clearInterval(this.state.interval);
  }

  componentDidMount(){
      return fetch('https://tennisballcricket.com/bestteamplayers/184')
        .then((response)=>response.json())
        .then((response)=>{
          this.setState({
            data:response,
            isLoading: false,
          });
        })
        .catch(error=>{
          //alert(error);
          this.setState({
            isLoading:false
          });
        });
      }

  render(){
    return(
      <View style={styles.container}>
        <DukesHeader title='Dukes XI' navigate={this.props.navigation.navigate}/>
        <View style={{margin:10}}>
        <ImageSlider
                    height={270}
                    images={this.state.images}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({position})}/>
        </View>
        <ScrollView>
        <Card
          title='Top Batsman'
          >
          <Text style={{marginBottom: 10}}>
            {this.state.isLoading? "Loading":this.state.data.Batsman.FirstName + ' ( '+
              this.state.data.Batsman.RunScored+' runs of '+this.state.data.Batsman.BallFaced
            +' balls )'}
          </Text>
        </Card>
        <Card
          title='Top Bowler'
          >
          <Text style={{marginBottom: 10}}>
            {this.state.isLoading? "Loading":this.state.data.Bowler.FirstName + ' ( '+
              this.state.data.Bowler.Overs+'-'+this.state.data.Bowler.Maidens
            +'-'+this.state.data.Bowler.Runs+'-'+this.state.data.Bowler.Wickets+' )'}
          </Text>
        </Card>
        </ScrollView>
      </View>
    );
  }
}
