import React, { useState } from 'react'
import { Container, Content, Form, Item, Input, Label, Button, Spinner } from 'native-base';
import { Text } from "react-native";
import firebase from "firebase"

const AddClass = () => {

  const [name, setName] = useState("");
  const [cls, setClass] = useState("");
  const [unitCode, setCode] = useState("");
  const [loading, setLoading] = useState(false)
  const [errorMessage, setError] = useState({
    message: "",
    show: false
  })

  const addClass = async () => {
    try {
      if(name === "" || cls === "" || unitCode === "") {
        throw new Error('Please fill in all details');
      }
      setError({
        message: "",
        show: false
      })
      setLoading(true)
      let uid = firebase.auth().currentUser.uid
      let key = firebase.database().ref().push().key
      await firebase.database().ref(`teacherClass/${ uid }/${ key }`).set({
        name,
        class: cls,
        unitCode,
        key
      })
      const teacherName = await firebase.database().ref(`users/${ uid }`).once("value")
      await firebase.database().ref(`classes/${ key }`).set({
        name,
        uid,
        class: cls,
        unitCode,
        key,
        teacherName: teacherName.val().fullNames
      })
      console.log("Create class");
    } catch (error) {
      setError({
        message: error.message || "this is not showibng",
        show: true
      })

    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Content>
        <Form>
          {
            errorMessage.show ? <Text style={{ color: "red" }}> {errorMessage.message} </Text> : null
          }
          <Item floatingLabel>
            <Label>Unit Name</Label>
            <Input onChangeText={text => setName(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Class Name e.g. RM 34</Label>
            <Input onChangeText={text => setClass(text)} />
          </Item>
          <Item floatingLabel>
            <Label>Unit Code</Label>
            <Input onChangeText={text => setCode(text)} />
          </Item>
        </Form>
        <Button disabled={loading} onPress={() => {
          addClass()
        }} primary style={{ margin: 10, padding: 10 }}><Text style={{ color: "white" }}> Add Class </Text></Button>
        {!loading ? null : <Spinner color='blue' />}
      </Content>
    </Container>
  )
}

AddClass.navigationOptions = {
  title: 'Add Class',
};

export default AddClass
