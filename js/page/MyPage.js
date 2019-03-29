import React, {Component} from 'react';
import {Button, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MyPage extends Component {
    render() {
        return (
            <View>
                <Button title="改变主题颜色" onPress={() => {
                    this.props.onThemeChange('red');
                }}/>
            </View>
        )
    }
}