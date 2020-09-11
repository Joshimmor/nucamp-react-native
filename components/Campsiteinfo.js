import React,{Component} from "react";
import {View, Text} from "react-native";
import {Card} from "react-native-elements";
import {CAMPSITE, CAMPSITES} from "../shared/campsites"
//renders campsite info card 

function RenderCampsite({campsite}){
    if(campsite){
        return(
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}>
                 <Text style={{margin:10}}>
                    {campsite.description}
                </Text>
            </Card> 
        )
    }
    return(
        <View/>
    ) 
}
//info component
class CampsiteInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            campsites: CAMPSITES
        };
    }
    static navigationOptions = {
        title: 'Campsite Information'
    }

 render(){
   
            const campsiteId = this.props.navigation.getParam('campsiteId');
            const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
            return <RenderCampsite campsite={campsite} />;
            
    }
}

export default CampsiteInfo; 