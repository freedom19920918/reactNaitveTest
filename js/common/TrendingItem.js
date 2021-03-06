import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';

export default class TrendingItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        onselect: PropTypes.func,
    };

    render() {
        const {item} = this.props;
        if (!item) return null;
        const description = `<p>${item.description}</p>`;
        const favoriteButton = <TouchableOpacity onPress={() => {
        }} style={{padding: 6}} underlayColor={"transparent"}>
            <FontAwesome name={'star-o'} size={26} style={{color: 'red'}}/>
        </TouchableOpacity>
        return (<TouchableOpacity onPress={this.props.onSelect}>
            <View style={styles.cell_container}>
                <Text style={styles.title}>{item.fullName}</Text>
                <HTMLView value={description} stylesheet={{
                    p: styles.description,
                    a: styles.description
                }}/>
                <Text style={styles.description}>{item.meta}</Text>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text>Build by:</Text>
                        {
                            item.contributors.map((result, i, arr) => {
                                return <Image key={i} style={{height: 22, width: 22, margin: 2}}
                                              source={{uri: arr[i]}}/>
                            })
                        }

                    </View>
                    <View>
                        {favoriteButton}
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }
}
const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
});