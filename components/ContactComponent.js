import React, { Component } from 'react'
import { ScrollView,Text } from 'react-native';
import {Card} from "react-native-elements";



export class ContactComponent extends Component {
    static navigationOptions =  {title: "Contact us"}
    render() {
        return (
            <ScrollView>
                <Card 
                title='Contact Information'
                wrapperStyle={{margin: 10}}>
                    <Text>1 Nucamp Way</Text>
                    <Text>Seattle, WA 98001</Text>
                    <Text >U.S.A.</Text>
                     <Text> {"\n"}Phone: 1-206-555-1234</Text>
                    <Text style={{marginBottom:10}}>Email: campsites@nucamp.co</Text>
                </Card>
            </ScrollView>
        )
    }
}

export default ContactComponent
