import react, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Card} from "react-native-elements";
import {CAMPSITES} from "../shared/campsites";
import {PROMOTIONS} from "../shared/promotions";
import {PARTNERS} from "../shared/partners"

//RENDER ITEMS
function RenderItems({item}){
    if(item){
        return(
            <Card
                featuredTitle={item.name}
                image={require('./images/react-lake.jpg')}>
                <Text
                    style={{margin:10}}>
                    {item.description}
                </Text>
            </Card>
        )
    }
    return <View/>;
}
//HOME COMPONENT
class Home extends Component{
   constructor(props){
       super(props)
       this.state = {
        campsites: CAMPSITES,
        promotions: PROMOTIONS,
        partner: PARTNERS,
       };
   } 
        static navigationOptions ={
             title: "Home"
        }
        
    render(){
        return(
            <ScrollView>
                <RenderItems
                item={this.state.campsites.filter(campsite => campsite.featured)[0]}/>
                <RenderItems
                item={this.state.promotions.filter(promotion => promotion.featured)[0]}/>
                <RenderItems
                item={this.state.partners.filter(partner=> partner.featured)[0]}/>
            </ScrollView>
        );
    }
}

export default Home;