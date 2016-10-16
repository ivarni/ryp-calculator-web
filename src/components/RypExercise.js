import React, { Component, PropTypes } from 'react';

import ClearIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

import { darkBlack, lightBlack } from 'material-ui/styles/colors';

const clearIconStyle = {
    position: 'absolute',
    right: 26,
    top: 2,
};

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
        } = this.props;

        const color = finished ? lightBlack : darkBlack;
        const textDecoration = finished ? 'line-through' : 'none';

        return (
            <div
                style={{
                    position: 'relative',
                    borderBottom: `2px solid ${darkBlack}`,
                    paddingBottom: 10,
                    paddingLeft: 36,
                }}
            >
                <h2
                    style={{
                        color,
                        fontSize: 18,
                        fontWeight: 400,
                        textDecoration,
                    }}
                >
                    {title}
                </h2>
                <p
                    style={{
                        color,
                        margin: 0,
                        textDecoration,
                    }}
                >
                    {subtitle} kg
                </p>
                <IconButton
                    style={clearIconStyle}
                    onTouchTap={this.onClear}
                >
                    <ClearIcon color={color} />
                </IconButton>
                { notes &&
                    <p style={{ color, textDecoration }}>
                        { notes }
                    </p>
                }
            </div>
        );
    }

}

RypExercise.propTypes = {
    finished: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    onFinished: PropTypes.func.isRequired,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default RypExercise;
