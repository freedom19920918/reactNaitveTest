import React, {Component} from 'react';
import {Text} from 'react-native';

export default class WelcomePage extends Component {
    componentDidMount(): void {
        console.log(22)

    }

    render() {
        return (
            <Text> Welcome to my world</Text>
        )
    }
}