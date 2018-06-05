import React, { Component } from 'react'
import { Container, Spinner, Text } from 'native-base'
import styles from './styles'
export default class extends Component {

    render() {
        const { message = 'Application Loading...' } = this.props
        return (
            <Container style={styles.container}>
                <Text>{message}</Text>
                <Spinner color={'#007aff'} />
            </Container>
        )
    }
}