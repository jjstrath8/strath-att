import React, { useState, useEffect } from 'react'
import { Container, Icon, Content, List, Item, Text, ListItem, Body, Button } from 'native-base';
import firebase from "firebase"
import rNative from "react-native";

const Classes = (props) => {

  const [classes, setClass] = useState([])

  useEffect(() => {
    getClasses()
  }, [])


  const getClasses = async () => {
    try {
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref(`studentClass/${uid}`).on('child_added', (data) => {
        setClass(oldArray => [...oldArray, data.val()])
      })
    } catch (error) {
      console.log(error.message || error);
    }
  }

  return (
    <Container>
      <Content>
        <List>
          {
            classes.map((cls) => {
              return <ListItem key={cls.unitCode} >
                <Body>
                  <Text>{cls.name}</Text>
                  <Text note numberOfLines={1}>Lecturer: {cls.teacherName}</Text>
                  <Text note numberOfLines={1}>Room: {cls.class}</Text>
                  <Text note numberOfLines={1}>Unit Code: {cls.unitCode}</Text>
                </Body>
                <Button transparent onPress={() => {
                  props.navigation.navigate("StudentRegister", {
                    key: cls.key,
                    name: cls.name,
                    uid: cls.uid
                  })
                }}>
                  <rNative.Text>VIEW</rNative.Text>
                </Button>
              </ListItem>;
            })
          }
        </List>
      </Content>
    </Container>
  )
}

Classes.navigationOptions = ({ navigation }) => {
  return {
    title: 'My Classes',
    headerRight: (
      <Item style={{ paddingRight: 10 }}>
        <Button style={{ paddingRight: 10 }} transparent onPress={async () => {
          navigation.navigate("JoinClass")
        }} >
          <Icon type="FontAwesome" name='users' />
        </Button>
        <Button transparent onPress={async () => {
          await firebase.auth().signOut()
          navigation.goBack()
        }} >
          <Icon type="FontAwesome" name='power-off' />
        </Button>
      </Item>
    ),
  }
};

export default Classes
