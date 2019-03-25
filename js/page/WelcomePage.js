import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            const {navigation} = this.props;
            navigation.navigate('Main');
        }, 200)

    }

    componentWillUnmount(): void {
        this.timer && clearInterval(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}> welcome to my world</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        color: '#fff',
        backgroundColor: 'pink',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});