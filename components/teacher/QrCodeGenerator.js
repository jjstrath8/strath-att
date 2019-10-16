import React, { useEffect } from 'react'
import QRCode from 'react-native-qrcode';
import { Container, Content } from 'native-base';

const QrCode = (props) => {

  useEffect(() => {
    console.log(props.navigation.getParam('key', ''), props.navigation.getParam('uid', ''));
  })

  return (
    <Container style={{
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Content >
        <QRCode
          value={`${props.navigation.getParam('uid', '')} (${props.navigation.getParam('key', '')})`}
          size={300}
          bgColor='black'
          fgColor='white' />
      </Content>
    </Container>
  )
}

export default QrCode
