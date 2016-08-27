import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { onFinished } from 'ryp-calculator/lib/dispatchers';

import RypDay from '../components/RypDay';

class RypResult extends Component {

    constructor(props) {
        super(props);
        this.renderDay = this.renderDay.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const lastFinished = 18 - Array.from(nextProps.days)
            .reverse()
            .findIndex(day => day && day.every(e => e.finished));
        const scrollTo = this[`_child-${lastFinished}`];
        if (scrollTo) {
            scrollTo.scrollIntoView();
        }
    }

    renderDay(day, index) {
        return (
            <RypDay
                day={day}
                index={index}
                key={index}
                onFinished={this.props.onFinished}
                ref={_child => this[`_child-${index}`] = _child}
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
