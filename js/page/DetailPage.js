import React, {Component} from 'react';
import {Text, View, Platform, StyleSheet, DeviceInfo} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';

const TRENDING_URL = 'https://github.com/';

const THEME_COLOR = '#678';
const statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
};
export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel} = this.params;
        this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
        const title = projectModel.full_name || projectModel.fullName;
        this.state = {
            title,
            url: this.url,
            canGoBack: true
        }
    }

    onBack = () => {
    };
    renderRightButton = () => {
    };

    render() {
        const navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            titleView={this.state.title}
            rightButton={this.renderRightButton()()}
            style={{backgroundColor: THEME_COLOR}}/>;
        return (
            <View style={{flex: 1, marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0}}>
                {navigationBar}
                <Text> DetailPage</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({});