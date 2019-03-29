import React, {Component} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FavoritePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="改变主题色(green)"
                    onPress={() => {
                        this.props.onThemeChange('green');
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
