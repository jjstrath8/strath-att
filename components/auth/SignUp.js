import React, { useState } from 'react'
import { Container, Content, Form, Item, Input, Label, Spinner, Picker, Icon } from 'native-base';
import { Text, Button, View, StyleSheet } from "react-native";
import firebase from "firebase"

const SignUp = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [adminNo, setAdminNo] = useState("");
  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setError] = useState({
    message: "",
    show: false
  })

  const signUpUser = async () => {
    try {
      setError({
        message: "",
        show: false
      })
      setLoading(true)
      if (role === 0 ) {
        throw new Error('Please choose a role');
      }
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      let uid = firebase.auth().currentUser.uid
      await firebase.database().ref(`users/${ uid }`).set({
        email,
        fullNames,
        adminNo,
        role
      })
      console.log("User signed up");
    } catch (error) {
      setError({
        message: error.message,
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
            errorMessage.show ? <View style={{ marginTop: 20, backgroundColor: "red", padding: 20, marginLeft: 20, marginRight: 20, borderRadius: 20 }}><Text style={styles.baseText}> {errorMessage.message} </Text></View> : null
          }
          <Item floatingLabel>
            <Label>Full Names</Label>
            <Input onChangeText={text => setFullNames(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Admin No</Label>
            <Input onChangeText={text => setAdminNo(text)} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={text => setEmail(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input onChangeText={text => setPassword(text)} />
          </Item>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined, margin: 15 }}
              placeholder="Choose Role"
              placeholderIconColor="#007aff"
              selectedValue={role}
              onValueChange={role => setRole(role)}
            >
              <Picker.Item label="Choose a role" value="0" />
              <Picker.Item label="Teacher" value="1" />
              <Picker.Item label="Student" value="2" />
            </Picker>
          </Item>
        </Form>
        <View style={{padding: 20, marginTop: 20}}>
          <Button
            title="Sign Up"
            disabled={loading}
            onPress={() => signUpUser()}
          />
        </View>
        {!loading ? null : <Spinner color='blue' />}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  baseText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  titleText: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 35,
    textAlign: "center",
    fontWeight: 'bold',
  },
  view: {
    paddingLeft: 20,
    paddingRight: 20
  }
});

SignUp.navigationOptions = {
  title: 'SignUp',
};

export default SignUp
