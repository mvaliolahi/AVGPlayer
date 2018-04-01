import React, {Component} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {Card} from "../Card/Card";

const screen = Dimensions.get('window');

export class GridView extends Component {

    static divideScreenToColumnsNumberToFitCards(margin, columns) {
        return (screen.width - margin * columns) / columns;
    }

    render() {
        const columns = this.props.columns || 3;
        const margin = this.props.margin || 8;
        const {dataSource, itemEvent} = this.props;

        return (
            <FlatList
                numColumns={columns}
                data={dataSource}
                renderItem={({item, index}) => {
                    return (
                        <Card
                            width={GridView.divideScreenToColumnsNumberToFitCards(margin, columns)}
                            key={item.cover}
                            artist={item.author}
                            album={item.album}
                            cover={item.cover}
                            handler={itemEvent}
                            item={Object.assign({}, item, {id: index})}
                        />
                    );
                }}
                keyExtractor={(index) => index}
                showsVerticalScrollIndicator={false}
            />
        );
    }
}