import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, RefreshControl, ActivityIndicator, DeviceInfo} from 'react-native';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import Toast from 'react-native-easy-toast'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationBar from '../common/NavigationBar';
import PopularItem from '../common/PopularItem';
import actions from '../action';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';

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
                },

            }
        });
        return tabs;

    };

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        const navigationBar = <NavigationBar title={"最热"} statusbar={statusBar} style={{backgroundColor: THEME_COLOR}}/>
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
            /*
            * 如果是iphoneX,那么设置一个marginTop
            * */
            <View style={{flex: 1, marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0}}>
                {navigationBar}
                <TopTabNavigator/>
            </View>

        )
    }
}

const mapStateToProps = (state, ownProps) => ({popular: state.popular});
const mapDispatchToProps = (dispatch) => ({
    onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
});


const pageSize = 10;//设为常量，防止修改


@connect(mapStateToProps, mapDispatchToProps)
class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.storeName = props.tabLabel;
    }

    componentDidMount(): void {
        this.loadData();
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

    loadData = (loadMore) => {
        const {onRefreshPopular, onLoadMorePopular} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else {
            onRefreshPopular(this.storeName, url, pageSize);
        }

    };

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    genFetchUrl = (key) => {
        return URL + key + QUERY_STR;
    };

    renderItem = (data) => {
        return <PopularItem item={data.item} onselect={() => {
        }}/>
    };

    render() {
        const {popular} = this.props;
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList data={store.projectModels}
                          renderItem={(data) => this.renderItem(data)}
                          keyExtractor={item => "" + item.id}
                          refreshControl={
                              <RefreshControl title={'Loading'} titleColor={THEME_COLOR} refreshing={store.isLoading}
                                              tintColor={THEME_COLOR}
                                              onRefresh={() => this.loadData()}/>
                          }
                          ListFooterComponent={() => this.genIndicator()}
                          onEndReached={() => {
                              console.log('---onEndReached----');
                              setTimeout(() => {
                                  if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                      this.loadData(true);
                                      this.canLoadMore = false;
                                  }
                              }, 100);
                          }}
                          onEndReachedThreshold={0.5}
                          onMomentumScrollBegin={() => {
                              this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                              console.log('---onMomentumScrollBegin-----')
                          }}
                />
                <Toast ref={'toast'}
                       position={'center'}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
