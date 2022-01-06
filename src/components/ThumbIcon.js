import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const ThumbIcon = ({ ups }) => {
    if (ups > 0) {
        return <Icon name="thumbs-up" size={20} color="green" />
    } else if (ups === 0) {
        return <Icon name="thumbs-up" size={20} color="grey" />
    } else {
        return <Icon name="thumbs-up" size={20} color="red" />
    }
}

export default ThumbIcon;