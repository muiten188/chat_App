import React, { Component } from 'react'
import {
    Container,
    Text
} from 'native-base'
import styles from './styles'
export default class extends Component {
    constructor(props) {
        super(props)
      }
    render() {
        return (
            <Container style={this.props.style?this.props.style:{}}>
                <Container style={styles.legend}>
                    <Text>
                        {this.props.legend}
                    </Text>
                </Container>
                <Container style={styles.border}>
                    {this.props.children}
                </Container>
            </Container>
        )
    }
}