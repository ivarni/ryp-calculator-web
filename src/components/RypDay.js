import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui/Card';

import formulas from '~/formula';

function getDay(day, exercises) {
    const formula = formulas[day];
    return exercises.map(exercise => ({
        ...exercise,
        value: (exercise.value * formula.multiplier).toFixed(1),
        sets: formula.sets[exercise.name],
    }));
}

function RypDay(props) {
    const { day, exercises } = props;
    const result = getDay(day, exercises);
    const paperStyle = { margin: '25 0' };
    const h2Style = {
        color: 'rgba(0, 0, 0, 0.870588)',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, sans-serif',
        padding: 16,
    };

    return (
        <div>
            <Paper style={paperStyle} zDepth={2}>
                <h2 style={h2Style}>
                    {`${formulas[day].title}`}
                </h2>
                {result.map(r => (
                    <Card>
                        <CardHeader
                            title={`${r.label}, ${r.sets} sett`}
                            subtitle={r.value}
                        />
                        { r.notes &&
                            <CardText>
                                { r.notes }
                            </CardText>
                        }
                    </Card>
                ))}

            </Paper>
        </div>
    );
}

RypDay.propTypes = {
    exercises: PropTypes.array.isRequired,
    day: PropTypes.number.isRequired,
};

export default RypDay;
