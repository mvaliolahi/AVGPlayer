import React from 'react';
import {TabBarBottom} from "react-navigation";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export const TabOptions = {
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = 'star';
            } else if (routeName === 'Player') {
                iconName = 'play';
            } else if (routeName === 'TopMusics') {
                iconName = 'linux';
            }

            return <Icon name={iconName} size={25} color={tintColor}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
};