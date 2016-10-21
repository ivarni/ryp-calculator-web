import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { onFinished } from 'ryp-calculator/lib/dispatchers';

import {
    Card,
    CardHeader,
} from 'material-ui/Card';
import { darkBlack, lightBlack } from 'material-ui/styles/colors';

import RypDay from '../components/RypDay';

const h2Style = {
    color: darkBlack,
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    padding: 16,
};

class RypResult extends Component {

    static findVisibleIndex(props) {
        const { days } = props;

        const firstUnFinished = days.find(d => !d.every(e => e.get('finished'))) || days.get(0);
        return days.indexOf(firstUnFinished);
    }

    constructor(props) {
        super(props);
        this.renderDay = this.renderDay.bind(this);
        this.showNext = this.showNext.bind(this);
        this.showPrevious = this.showPrevious.bind(this);

        this.state = {
            visibleIndex: 0,
        };
    }

    componentWillMount() {
        const visibleIndex = RypResult.findVisibleIndex(this.props);

        this.setState({
            visibleIndex,
        });
    }

    showPrevious() {
        this.setState({
            visibleIndex: this.state.visibleIndex - 1,
        });
    }

    showNext() {
        this.setState({
            visibleIndex: this.state.visibleIndex + 1,
        });
    }

    renderDay(day, index) {
        const { finished } = day;

        const color = finished ? lightBlack : darkBlack;
        const textDecoration = finished ? 'line-through' : 'none';

        return (
            <Card>
                {index > 0 &&
                    <a
                        href="#neste"
                        onClick={this.showPrevious}
                    >
                        Forrige
                    </a>
                }
                {index < 17 &&
                    <a
                        href="#forrige"
                        onClick={this.showNext}
                    >
                        Neste
                    </a>
                }
                <CardHeader
                    title={day.get(0).title}
                    titleStyle={{ ...h2Style, color, textDecoration, fontSize: 20 }}
                />
                <RypDay
                    day={day}
                    index={index}
                    key={index}
                    onFinished={this.props.onFinished}
                    ref={(_child) => { this[`_child-${index}`] = _child; }}
                />
            </Card>
        );
    }

    render() {
        const { days } = this.props;
        const { visibleIndex } = this.state;

        const firstUnFinished = days.get(visibleIndex);
        return (
            <div>
                <div>
                    {this.renderDay(firstUnFinished, visibleIndex)}
                </div>
            </div>
        );
    }
}

RypResult.propTypes = {
    days: PropTypes.object.isRequired,
    onFinished: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        days: state.days,
    };
}

export default connect(mapStateToProps, {
    onFinished,
})(RypResult);
