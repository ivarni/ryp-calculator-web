import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { onFinished } from 'ryp-calculator/lib/dispatchers';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { Card, CardHeader } from 'material-ui/Card';
import { darkBlack, lightBlack } from 'material-ui/styles/colors';
import NextDayIcon from 'material-ui/svg-icons/av/skip-next';
import PreviousDayIcon from 'material-ui/svg-icons/av/skip-previous';
import CurrentDayIcon from 'material-ui/svg-icons/action/home';


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
        this.showPrevious = this.showPrevious.bind(this);
        this.showCurrent = this.showCurrent.bind(this);
        this.showNext = this.showNext.bind(this);

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
        const { visibleIndex } = this.state;

        if (visibleIndex < 1) {
            return;
        }

        this.setState({
            visibleIndex: this.state.visibleIndex - 1,
        });
    }

    showCurrent() {
        this.componentWillMount();
    }

    showNext() {
        const { visibleIndex } = this.state;

        if (visibleIndex > 16) {
            return;
        }

        this.setState({
            visibleIndex: this.state.visibleIndex + 1,
        });
    }

    renderDay(day, index) {
        const { finished } = day;

        const color = finished ? lightBlack : darkBlack;
        const textDecoration = finished ? 'line-through' : 'none';

        const previousDayColor = index > 0 ? darkBlack : lightBlack;
        const nextDayColor = index < 17 ? darkBlack : lightBlack;

        return (
            <Card>
                <BottomNavigation>
                    <BottomNavigationItem
                        icon={<PreviousDayIcon color={previousDayColor} />}
                        label="Forrige dag"
                        onTouchTap={this.showPrevious}
                    />
                    <BottomNavigationItem
                        icon={<CurrentDayIcon color={darkBlack} />}
                        label="Dagen i dag"
                        onTouchTap={this.showCurrent}
                    />
                    <BottomNavigationItem
                        icon={<NextDayIcon color={nextDayColor} />}
                        label="Neste dag"
                        onTouchTap={this.showNext}
                    />
                </BottomNavigation>
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
