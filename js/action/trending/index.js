import Types from '../types';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore';
import {handleData} from '../ActionUtil';

/**
 *
 */

export function onRefreshTrending(storeName, url, pageSize) {
    return dispatch => {
        dispatch({
            type: Types.TRENDING_REFRESH, storeName,
        });
        const dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_trending)
            .then((data) => {
                handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize);
            })
            .catch((error) => {
                console.log('error', error);
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName,
                    error,
                });
            })
    }
}

export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callback) {
    console.log('onLoadMoreTrending')
    return dispatch => {
        setTimeout(() => {//模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callback === 'function') {
                    callback('no more');
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModels: dataArray,
                });
            } else {
                //本次可载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModels: dataArray.slice(0, max),
                });
            }

        }, 500)
    }
}

