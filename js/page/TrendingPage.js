import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';

export default class TrendingPage extends Component {

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Button
                    title="改变主题色"
                    onPress={() => {
                        navigation.setParams({theme:{
                                tintColor:'orange',
                                updateTime:new Date().getTime()
                            }})
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
    }
});