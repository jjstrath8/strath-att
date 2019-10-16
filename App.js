import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"

import TeacherClass from "./components/teacher/Classes"
import TeacherAddClass from "./components/teacher/AddClass"
import TeacherRegisters from "./components/teacher/Registers"
import TeacherRegister from "./components/teacher/Register"
import QrCodeGenerator from "./components/teacher/QrCodeGenerator"

import StudentClass from "./components/student/Classes"
import JoinClass from "./components/student/JoinClass"
import StudentRegister from "./components/student/Register"
import QrCodeScanner from "./components/student/QrCodeScanner"

import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyC_ccuNmLpk-OgkY5_m4OIsQWlp-l7u0Qs",
  authDomain: "strath-att.firebaseapp.com",
  databaseURL: "https://strath-att.firebaseio.com",
  projectId: "strath-att",
  storageBucket: "",
  messagingSenderId: "107691321730",
  appId: "1:107691321730:web:4bab365acb45f86450879b"
};

firebase.initializeApp(firebaseConfig)

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
  TeacherClass: {
    screen: TeacherClass
  },
  TeacherAddClass: {
    screen: TeacherAddClass
  },
  TeacherRegisters: {
    screen: TeacherRegisters
  },
  TeacherRegister: {
    screen: TeacherRegister
  },
  QrCodeGenerator: {
    screen: QrCodeGenerator
  },
  JoinClass: {
    screen: JoinClass
  },
  StudentClass: {
    screen: StudentClass
  },
  StudentRegister: {
    screen: StudentRegister
  },
  QrCodeScanner: {
    screen: QrCodeScanner
  },
});

export default createAppContainer(AppNavigator);
