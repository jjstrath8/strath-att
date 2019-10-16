import React, { useState, useEffect } from 'react'
import { Container, Content, Form, Item, Input, Label, Spinner } from 'native-base';
import { Text, Button, View, StyleSheet } from "react-native";
import firebase from "firebase"

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [errorMessage, setError] = useState({
    message: "",
    show: false
  })

  useEffect(() => {
    setLoading(true)
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let snapshot = await firebase.database().ref(`users/${user.uid}`).once("value")
        if (snapshot.val().role === "1") {
          // This is a teacher
          props.navigation.navigate("TeacherClass")
        } else {
          // This is student
          props.navigation.navigate("StudentClass")
        }
        setLoading(false)
        console.log("user signed in");
      } else {
        // No user is signed in.
        setLoading(false)
        console.log("no user");
      }
    });
  }, [])

  const loginUser = async () => {
    try {
      setError({
        message: "",
        show: false
      })
      setLoading(true)
      await firebase.auth().signInWithEmailAndPassword(email, password)
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
        <Text style={styles.titleText}>Strath Att</Text>
        <Form>
          {
            errorMessage.show ? <View style={{ backgroundColor: "red", padding: 20, marginLeft: 20, marginRight: 20, borderRadius: 20 }}><Text style={styles.baseText}> {errorMessage.message} </Text></View> : null
          }
          <View style={styles.view}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={text => setEmail(text)} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={text => setPassword(text)} />
            </Item>
          </View>
        </Form>
        <View style={{ padding: 20 }}>
          <Button
            title="Log in"
            disabled={loading}
            onPress={() => loginUser()}
          />
          <View style={{ padding: 10 }}></View>
          <Button
            title="Sign Up"
            disabled={loading}
            onPress={() => props.navigation.navigate("SignUp")}
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

Login.navigationOptions = {
  title: 'Login',
};

export default Login
