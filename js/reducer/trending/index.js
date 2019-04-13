import Types from '../../action/types';

/**
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading:false,
 *     },
 *     ios:{
 *         items:[],
 *         isLoading:false,
 *     },
 * }
 *@param {Object} state;
 * @param action
 * */
export default function onAction(state = {}, action) {
    switch (action.type) {
        case Types.TRENDING_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: false,

                }
            };
        case Types.TRENDING_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//原始数据
                    projectModels: action.projectModels,
                    isLoading: false,
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }

            };
        case Types.TRENDING_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }
            };
        case Types.TRENDING_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    pageIndex: action.pageIndex,
                    hideLoadingMore: false,
                }
            };
        case Types.TRENDING_LOAD_MORE_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    pageIndex: action.pageIndex,
                    hideLoadingMore: true,
                }
            };
        default:
            return state;

    }
}