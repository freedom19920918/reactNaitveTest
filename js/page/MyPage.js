import React, {Component} from 'react';
import {Button, View, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../common/NavigationBar';
import actions from '../action';

const THEME_COLOR = '#678';
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MyPage extends Component {
    getRightButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
            }}>
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather name={"search"} size={24} style={{color: 'white'}}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton(callback) {
        return (
            <TouchableOpacity style={{padding: 8, paddingLeft: 12}}
                              onPress={callback}>
                <Ionicons name={"ios-arrow-back"}
                         size={26}
                         style={{color: 'white'}}/>
            </TouchableOpacity>
        )
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        const navigationBar = <NavigationBar rightButton={this.getRightButton()} leftButton={this.getLeftButton()}
                                             title={"我的"} statusbar={statusBar} style={{backgroundColor: THEME_COLOR}}/>
        return (
            <View style={styles.container}>
                {navigationBar}
                <Button title="改变主题颜色" onPress={() => {
                    this.props.onThemeChange('red');
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
});