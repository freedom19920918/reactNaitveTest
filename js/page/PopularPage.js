import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import commonStyle from '../commonStyle';

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'IOS', 'React', 'React Native', 'PHP'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;

    };

    render() {
        const TopTabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                scrollEnabled: true,
                upperCaseLabel: false,
                style: {
                    backgroundColor: '#678'
                }
            }
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
