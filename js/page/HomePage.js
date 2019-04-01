import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {createBottomTabNavigator, createAppContainer,NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
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

const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.nav,
        theme: state.theme.theme,
    }
};

@connect(mapStateToProps)
export default class HomePage extends Component {
    componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        console.log('nav',nav)
        if (nav.routes[1].index === 0) {//如果是main路由中的第一个页面，则什么也不做
            return false;
        } else {
            dispatch(NavigationActions.back());
            return true;
        }
    };

    _renderBottomTabHandler = () => {
        if (this.tabs) {
            return this.tabs;
        }
        return this.tabs = createAppContainer(createBottomTabNavigator(TABS, {
            tabBarComponent: props => <TabBarComponent {...props} theme={this.props.theme}/>,
        }));
    };

    render() {
        NavigationUtil.navigation = this.props.navigation;
        const BottomTab = this._renderBottomTabHandler();
        return <BottomTab/>
    }
}

class TabBarComponent extends Component {
    render() {
        return (
            <BottomTabBar {...this.props} activeTintColor={this.props.theme}/>)
    }
}