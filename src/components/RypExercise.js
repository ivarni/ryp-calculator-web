import React, { Component, PropTypes } from 'react';

import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import { darkBlack, lightBlack } from 'material-ui/styles/colors';


class RypExercise extends Component {

    constructor() {
        super();
        this.onClear = this.onClear.bind(this);
    }

    onClear() {
        this.props.onFinished(this.props.name);
    }

    render() {
        const {
            title,
            subtitle,
            notes,
            finished,
            onFinished,
        } = this.props;

        const color = finished ? lightBlack : darkBlack;
        const textDecoration = finished ? 'line-through' : 'none';

        return (
            <Card>
                <CardHeader
                    title={title}
                    titleColor={color}
                    titleStyle={{ textDecoration }}
                    subtitle={subtitle}
                >
                    <IconButton
                        style={clearIconStyle}
                        onTouchTap={this.onClear}
                    >
                        <ClearIcon color={color} />
                    </IconButton>
                </CardHeader>
                { notes &&
                    <CardText>
                        { notes }
                    </CardText>
                }
            </Card>
        );
    }

}

const clearIconStyle = {
    position: 'absolute',
    right: 30,
    top: 10,
}

export default RypExercise;
