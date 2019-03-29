import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {onThemeChange} from "../action/theme";
import actions from '../action';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
    onThemeChange: (theme) => {
        dispatch(actions.onThemeChange(theme))
    },
});
@connect(mapStateToProps, mapDispatchToProps)
export default class TrendingPage extends Component {

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Button
                    title="改变主题色"
                    onPress={() => {
                        this.props.onThemeChange('orange');
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});