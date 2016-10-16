import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    fieldChange,
    fieldEdit,
    labelChange,
    labelEdit,
} from 'ryp-calculator/lib/dispatchers';

import RypField from '../components/RypField';

class RypForm extends Component {

    constructor() {
        super();

        this.onExpandChange = this.onExpandChange.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.renderField = this.renderField.bind(this);

        this.state = {
            expanded: null,
        };
    }

    onExpandChange(field) {
        this.setState({
            expanded: field,
        });
    }

    onValueChange(field, value) {
        this.props.fieldChange(field, Number(value));
    }

    onLabelChange(field, value, notes) {
        this.props.labelChange(field, value, notes);
    }

    renderField(exercise) {
        return (
            <RypField
                editLabel={this.onEditLabel}
                editValue={this.onEditValue}
                expanded={exercise.name === this.state.expanded}
                fieldName={exercise.name}
                fieldLabel={exercise.label}
                fieldValue={exercise.value}
                key={exercise.name}
                onExpandChange={this.onExpandChange}
                onValueChange={this.onValueChange}
                onLabelChange={this.onLabelChange}
                notes={exercise.notes}
            />
        );
    }

    render() {
        const { exercises } = this.props;

        return (
            <form>
                {exercises.map(this.renderField)}
            </form>
        );
    }

}

RypForm.propTypes = {
    exercises: PropTypes.object.isRequired,
    fieldChange: PropTypes.func.isRequired,
    labelChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const exercises = state.exercises;

    return {
        exercises,
    };
}

export default connect(mapStateToProps, {
    fieldChange,
    fieldEdit,
    labelChange,
    labelEdit,
})(RypForm);
