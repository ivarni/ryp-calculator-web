import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import { darkBlack } from 'material-ui/styles/colors';

import RypExercise from './RypExercise';

class RypDay extends Component {

    constructor() {
        super();
        this.onFinished = this.onFinished.bind(this);
    }

    onFinished(name) {
        this.props.onFinished(this.props.index, name);
    }

    scrollIntoView() {
        this._root.scrollIntoView();
    }

    render() {
        const { day } = this.props;

        return (
            <div ref={_root => this._root = _root}>
                <Paper style={paperStyle} zDepth={2}>
                    <h2 style={h2Style}>
                        {day[0].title}
                    </h2>
                    {day.map(exercise => (
                        <RypExercise
                            finished={exercise.finished}
                            key={exercise.label}
                            name={exercise.name}
                            notes={exercise.notes}
                            onFinished={this.onFinished}
                            subtitle={exercise.value}
                            title={`${exercise.label}, ${exercise.sets} sett`}
                        />
                    ))}

                </Paper>
            </div>
        );
    }
}

RypDay.propTypes = {
    day: PropTypes.array.isRequired,
};

const paperStyle = {
    margin: '25 0'
};

const h2Style = {
    color: darkBlack,
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    padding: 16,
};

export default RypDay;
