import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import { darkBlack, lightBlack } from 'material-ui/styles/colors';

import RypExercise from './RypExercise';

const paperStyle = {
    margin: '25 0',
};

const h2Style = {
    color: darkBlack,
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    padding: 16,
};

class RypDay extends Component {

    constructor() {
        super();
        this.onFinished = this.onFinished.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            expanded: false,
        };
    }

    handleToggle(expanded) {
        this.setState({ expanded });
    };

    onFinished(name) {
        this.props.onFinished(this.props.index, name);
        //this.handleToggle(false);
    }

    scrollIntoView() {
        this._root.scrollIntoView();
        this.handleToggle(true);
    }

    render() {
        const { day } = this.props;
        const { expanded } = this.state;

        const finished = day.every(exercise => exercise.finished);

        const color = finished ? lightBlack : darkBlack;
        const textDecoration = finished ? 'line-through' : 'none';

        return (
            <div ref={_root => { this._root = _root; }}>
                <Card expanded={expanded} onExpandChange={this.handleToggle}>
                    <CardHeader
                        title={day.get(0).title}
                        titleStyle={{...h2Style, color, textDecoration, fontSize: 20}}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
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
                </Card>
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
