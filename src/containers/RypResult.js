import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RypDay from '~/components/RypDay';

class RypResult extends Component {

    constructor(props) {
        super(props);
        this.renderDay = this.renderDay.bind(this);
    }

    renderDay(foo, day) {
        return (
            <RypDay
              key={day}
              exercises={this.props.exercises}
              day={day}
            />
        );
    }

    render() {
        return (
            <div>
                {Array(18).fill(null).map(this.renderDay)}
            </div>
        );
    }
}

RypResult.propTypes = {
    exercises: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        exercises: state.exercises,
    };
}

export default connect(mapStateToProps, {

})(RypResult);
