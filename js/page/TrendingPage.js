import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    DeviceInfo,
    DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import Toast from 'react-native-easy-toast'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationBar from '../common/NavigationBar';
import TrendingItem from '../common/TrendingItem';
import actions from '../action';
import TrendingDialog, {TimeSpans} from '../common/TrendingDialog';

const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';//如果发布的事件太多，那么可以单独建立一个文件夹专门用于事件名称的存储


const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';

export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['All', 'Java', 'Android', 'IOS', 'React', 'React Native', 'PHP'];
        this.state = {
            timeSpan: TimeSpans[0],
        }

    }


    _genTabs = () => {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTab {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },

            }
        });
        return tabs;

    };
    onSelectTimeSpan = (tab) => {
        this.dialog.dismiss();
        this.setState({timeSpan: tab});
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
    };
    renderTrendingDialog = () => {
        return (<TrendingDialog ref={dialog => this.dialog = dialog}
                                onSelect={tab => this.onSelectTimeSpan(tab)}/>)
    };

    renderTitleView = () => {
        return (
            <View>
                <TouchableOpacity underlayColor="transparent" onPress={() => this.dialog.show()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: '400'}}>
                            趋势 {this.state.timeSpan.showText}
                        </Text>
                        <MaterialIcons name={'arrow-drop-down'} size={22}
                                       style={{color: 'white'}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    _tabNav = () => {
        if (!this.tabNav) {
            return this.tabNav = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
                initialRouteName: 'tab1',
                tabBarOptions: {
                    scrollEnabled: true,
                    upperCaseLabel: false,
                    style: {
                        backgroundColor: '#678'
                    }
                },
            }));
        } else {
            return this.tabNav;
        }
    };

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        const navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            statusbar={statusBar}
            style={{backgroundColor: THEME_COLOR}}/>;
        const TopTabNavigator = this._tabNav();
        return (
            <View style={{flex: 1, marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0}}>
                {navigationBar}
                <TopTabNavigator/>
                {
                    this.renderTrendingDialog()
                }
            </View>

        )
    }
}

const mapStateToProps = (state, ownProps) => ({trending: state.trending});
const mapDispatchToProps = (dispatch) => ({
    onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack)),
});


const pageSize = 5;//设为常量，防止修改


@connect(mapStateToProps, mapDispatchToProps)
class TrendingTab extends Component {
    constructor(props) {
        super(props);
        this.storeName = props.tabLabel;
        this.timeSpan = props.timeSpan;
    }

    componentDidMount(): void {
        this.loadData();
        this.timeSpanChangeLitener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan;
            this.loadData();
        })
    }

    componentWillUnmount(): void {
        if (this.timeSpanChangeLitener) {
            this.timeSpanChangeLitener.remove();//组件卸载的时候释放资源
        }
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {trending} = this.props;
        let store = trending[this.storeName];
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
        const {onRefreshTrending, onLoadMoreTrending} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            console.log('loadMore')
            onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else {
            console.log('refresh')
            onRefreshTrending(this.storeName, url, pageSize);
        }

    };

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text>正在加载更多</Text>
            </View>
    }

    genFetchUrl = (key) => {
        return URL + key + `?` + this.timeSpan.searchText;
    };

    renderItem = (data) => {
        return <TrendingItem item={data.item} onselect={() => {
        }}/>
    };

    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList data={store.projectModels}
                          renderItem={(data) => this.renderItem(data)}
                          keyExtractor={(item, key) => `${item.fullName}_${key}`}
                          refreshControl={
                              <RefreshControl title={'Loading'} titleColor={THEME_COLOR} refreshing={store.isLoading}
                                              tintColor={THEME_COLOR}
                                              onRefresh={() => this.loadData()}/>
                          }
                          ListFooterComponent={() => this.genIndicator()}
                          onEndReached={() => {
                              console.log('---onEndReached----');
                              // this.loadData(true);
                              setTimeout(() => {
                                  if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                      this.loadData(true);
                                      this.canLoadMore = false;
                                  }
                              }, 300);
                          }}
                          onEndReachedThreshold={0.3}
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
