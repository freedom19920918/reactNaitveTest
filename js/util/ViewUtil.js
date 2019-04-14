import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
    /**
     * 获取左侧返回按钮
     * @param callback
     * @return {XML}
     * */
    static getLeftBackButton(callback) {
        return <TouchableOpacity onPress={callback}
                                 style={{padding: 8, paddingLeft: 12}}>
            <Ionicons name={'ios-arrow-back'}
                      size={26}
                      style={{color: 'white'}}/>
        </TouchableOpacity>
    }
}