import React, { Component } from 'react'
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';



export class ContactComponent extends Component {
    static navigationOptions =  {title: "Contact us"}
    sendMail(){
        MailComposer.composeAsync({
            recipients: ['campsites@nucamp.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern: '
        })
    }
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
                    <Button
                    title= "Send Email"
                    buttonStyle={{backgroundColor: '#5637DD', margin: 40}}
                    icon={
                        <Icon
                        name='envelope-o'
                        type='font-awesome'
                        color='#fff'
                        iconStyle={{marginRight: 10}}/>
                    }
                    onPress={()=> this.sendMail()}/>
                </Card>
            </ScrollView>
        )
    }
}

export default ContactComponent
