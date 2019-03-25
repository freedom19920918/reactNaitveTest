import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {BottomTabBar} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import PopularPage from './PopularPage';
import FavoritePage from './FavoritePage';
import TrendingPage from './TrendingPage';
import MyPage from './MyPage';
import NavigationUtil from "../navigator/NavigationUtil";

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({focusedm, horizontal, tintColor}) => (
                <MaterialIcons name={'whatshot'} fontSize={26} style={{color: tintColor}}/>)
        },
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({focusedm, horizontal, tintColor}) => (
                <Ionicons name={'md-trending-up'} fontSize={26} style={{color: tintColor}}/>)
        },
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '喜欢',
            tabBarIcon: ({focusedm, horizontal, tintColor}) => (
                <MaterialIcons name={'favorite'} fontSize={26} style={{color: tintColor}}/>)
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focusedm, horizontal, tintColor}) => (
                <Entypo name={'user'} fontSize={26} style={{color: tintColor}}/>)
        },
    },
};
export default class HomePage extends Component {
    _renderBottomTabHandler = () => {
        return createAppContainer(createBottomTabNavigator(TABS, {
            tabBarComponent: TabBarComponent,
        }));
    };

    render() {
        NavigationUtil.navigation = this.props.navigation;
        const BottomTab = this._renderBottomTabHandler();
        return <BottomTab/>
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        };

    }

    render() {
        const {routes, index} = this.props.navigation.state;
        console.log('this.props.navigation.state', this.props.navigation.state)
        if (routes[index].params) {
            const {theme} = routes[index].params;
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return (
            <BottomTabBar {...this.props} activeTintColor={this.theme.tintColor || this.props.activeTintColor}/>)
    }
}