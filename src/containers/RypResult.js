import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { onFinished } from 'ryp-calculator/lib/dispatchers';

import RypDay from '../components/RypDay';

class RypResult extends Component {

    constructor(props) {
        super(props);
        this.renderDay = this.renderDay.bind(this);
    }

    renderDay(day, index) {
        return (
            <RypDay
                key={index}
                day={day}
                index={index}
                onFinished={this.props.onFinished}
            />
        );
    }

    render() {
        return (
            <div>
                {this.props.days.map(this.renderDay)}
            </div>
        );
    }
}

RypResult.propTypes = {
    days: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        days: state.days,
    };
}

export default connect(mapStateToProps, {
    onFinished,
})(RypResult);
