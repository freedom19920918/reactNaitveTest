import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {View, Text, ViewPropTypes, StatusBar, StyleSheet, Platform} from 'react-native';

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在android中的高度
const STATUS_BAR_HEIGHT = 20;//状态栏的高度
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};
export default class NavigationBar extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusbar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element
    };
    static defaultProps = {
        statusbar: {
            barStyle: 'light-content',
            hidden: false,
        }
    }
    getButtonElement = (data) => {
        return (
            <View style={styles.navBarButton}>
                {data ? data : null}
            </View>
        )
    };

    render() {
        const statusBar = !this.props.statusbar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusbar}/>
            </View> : null;
        const titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;
        const content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>{titleView}</View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196F3'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    navBarButton: {
        alignItems: 'center'
    }
});