import React, { Component, PropTypes } from 'react';

import { CardText } from 'material-ui/Card';

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
        this.handleToggle(true);
    }

    render() {
        const { day } = this.props;

        return (
            <div ref={(_root) => { this._root = _root; }}>
                <CardText>
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
                </CardText>
            </div>
        );
    }
}

RypDay.propTypes = {
    day: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onFinished: PropTypes.func.isRequired,
};

export default RypDay;
