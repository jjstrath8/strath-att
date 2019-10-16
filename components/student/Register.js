import React, { useEffect, useState } from 'react'
import { Container, Icon, Content, List, Text, ListItem, Body, Button } from 'native-base';
import firebase from "firebase"
import rNative from "react-native";

const Register = (props) => {

  const [registers, setRegister] = useState([])

  useEffect(() => {
    getRegister(props.navigation.getParam('key', 'NO-ID'))
  }, [])

  const getRegister = async (key) => {
    try {
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref(`studentRegister/${uid}/${key}`).on('child_added', (data) => {
        console.log(data.val());
        setRegister(oldArray => [...oldArray, data.val()])
      })
    } catch (error) {

    }
  }

  return (
    <Container>
      <Content>
        <List>
          {
            registers.map((register) => {
              return <ListItem key={register.day}>
                <Body>
                  <Text>{register.day}</Text>
                  <Text note numberOfLines={1}>Registered</Text>
                </Body>
              </ListItem>;
            })
          }
        </List>
      </Content>
    </Container>
  )
}

Register.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('name', ''),
    headerRight: (
      <Button style={{ paddingRight: 10 }} transparent onPress={() => {
        const uid = firebase.auth().currentUser.uid
        navigation.navigate("QrCodeScanner", {
          key: navigation.getParam('key', ''),
          uid: navigation.getParam('uid', 'no uid')
        })
      }} >
        <Icon name='camera' />
      </Button>
    ),
  }
};

export default Register
