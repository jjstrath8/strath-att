import React, { useEffect, useState } from 'react'
import { Container, Icon, Content, List, Text, ListItem, Body, Button } from 'native-base';
import firebase from "firebase"
import rNative from "react-native";

const Registers = (props) => {

  const [registers, setRegister] = useState([])

  useEffect(() => {
    getRegister(props.navigation.getParam('key', 'NO-ID'))
  }, [])

  const getRegister = async (key) => {
    try {
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref(`teacherRegister/${uid}/${key}`).on('child_added', (data) => {
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
              console.log(register.students);
              return <ListItem key={register.day}>
                <Body>
                  <Text>{register.day}</Text>
                  <Text note numberOfLines={1}>{Object.keys(register.students).length} attended</Text>
                </Body>
                <Button transparent onPress={() => {
                  props.navigation.navigate("TeacherRegister", {
                    students: register.students,
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

Registers.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('name', ''),
    headerRight: (
      <Button style={{ paddingRight: 10 }} transparent onPress={() => {
        const uid = firebase.auth().currentUser.uid
        navigation.navigate("QrCodeGenerator", {
          key: navigation.getParam('key', ''),
          uid
        })
      }} >
        <Icon type="FontAwesome" name="qrcode" />
      </Button>
    ),
  }
};

export default Registers
