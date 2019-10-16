import React, { useEffect, useState } from 'react'
import { Container, Content, List, Text, ListItem, Body } from 'native-base';

const Register = (props) => {

  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents(props.navigation.getParam('students', ''))
  }, [])

  const getStudents = async (students) => {
    for (let student in students) {
      setStudents(oldArray => [...oldArray, students[student]])
    }
  }

  return (
    <Container>
      <Content>
        <List>
          {
            students.map((student) => {
              return <ListItem key={student}>
                <Body>
                  <Text>{student}</Text>
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
    title: "Attended Students",
  }
};

export default Register
