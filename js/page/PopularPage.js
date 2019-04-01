import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import { createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigator/NavigationUtil';

const mapStateTopProps = (state, ownProps) => {
    return {
        nav: state.nav,
    }
};

@connect(mapStateTopProps)
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'IOS', 'React', 'React Native', 'PHP'];

    }

    _genTabs = () => {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
          /*          tabBarOnPress:({navigation,defaultHandler})=>{
                        defaultHandler();
                    },*/
                },

            }
        });
        return tabs;

    };

    render() {
        const TopTabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
            initialRouteName: 'tab1',
            tabBarOptions: {
                scrollEnabled: true,
                upperCaseLabel: false,
                style: {
                    backgroundColor: '#678'
                }
            },
        }));
        return (
            <TopTabNavigator/>
        )
    }
}

class PopularTab extends Component {
    render() {
        const {tabLabel, navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>{tabLabel}</Text>

                <Text onPress={() => {
                    NavigationUtil.goPage({}, 'DetailPage')
                }}>点击跳转到详情页面</Text>
                <Text onPress={() => {
                    navigation.goBack();
                }}>返回</Text>
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
