import React, { useState, useEffect } from 'react'
import { Container, Root, Content, List, Toast, Text, ListItem, Body, Button } from 'native-base';
import firebase from "firebase"
import rNative from "react-native";

const JoinClass = () => {

  const [classes, setClass] = useState([])

  useEffect(() => {
    getClasses()
  }, [])

  const getClasses = async () => {
    try {
      firebase.database().ref(`classes`).on('child_added', (data) => {
        setClass(oldArray => [...oldArray, data.val()])
      })
    } catch (error) {
      console.log(error.message || error);
    }
  }

  const joinClass = async (cls) => {
    try {
      const uid = firebase.auth().currentUser.uid
      await firebase.database().ref(`studentClass/${ uid }/${ cls.key }`).set(
        cls
      )
      console.log("working");
      alert(`You have joined ${cls.teacherName}'s class (${cls.name})`)
    } catch (error) {

    }
  }

  return (
    <Root>
      <Container>
        <Content>
          <List>
            {
              classes.map((cls) => {
                return <ListItem key={cls.key} >
                  <Body>
                    <Text>{cls.name}</Text>
                    <Text note numberOfLines={1}>Lecturer: {cls.teacherName}</Text>
                    <Text note numberOfLines={1}>Room: {cls.class}</Text>
                    <Text note numberOfLines={1}>Unit Code: {cls.unitCode}</Text>
                  </Body>
                  <Button transparent onPress={() => {
                    joinClass(cls)
                  }}>
                    <rNative.Text>JOIN CLASS</rNative.Text>
                  </Button>
                </ListItem>;
              })
            }
          </List>
        </Content>
      </Container>
    </Root>
  )
}

JoinClass.navigationOptions = ({ navigation }) => {
  return {
    title: 'Join Class',
  }
};

export default JoinClass
