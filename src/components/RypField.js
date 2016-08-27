import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import {
    Card,
    CardActions,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class RypField extends Component {

    constructor(props) {
        super(props);
        this.onEditLabel = this.onEditLabel.bind(this);
        this.onEditValue = this.onEditValue.bind(this);
        this.onExpandChange = this.onExpandChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            editLabel: false,
            editValue: false,
        };
    }

    onEditLabel() {
        this.setState({
            editLabel: true,
            editValue: false,
        });
    }

    onEditValue() {
        this.setState({
            editLabel: false,
            editValue: true,
        });
    }

    onExpandChange() {
        this.props.onExpandChange(this.props.fieldName);
    }

    onClose() {
        this.setState({
            editLabel: false,
            editValue: false,
        });
    }

    onValueChange() {
        const { name, value } = findDOMNode(this.refs.input).querySelector('input');
        this.props.onValueChange(name, value);
        this.onClose();
    }

    onLabelChange() {
        const { name, value } = findDOMNode(this.refs.input).querySelector('input');
        const { value: notes } = findDOMNode(this.refs.notes).querySelector('input');
        this.props.onLabelChange(name, value, notes);
        this.onClose();
    }

    render() {
        const {
            expanded,
            fieldName,
            fieldLabel,
            fieldValue,
            notes,
        } = this.props;

        const {
            editLabel,
            editValue,
        } = this.state;

        const actions = [
            <FlatButton
              label="Lagre"
              primary
              onTouchTap={editLabel ? this.onLabelChange : this.onValueChange}
            />,
            <FlatButton
              label="Avbryt"
              secondary
              onTouchTap={this.onClose}
            />,
        ];

        return (
            <div>
                <Card
                  expanded={expanded}
                  onExpandChange={this.onExpandChange}
                >
                    <CardHeader
                      title={fieldLabel}
                      subtitle={`${fieldValue} kg`}
                      actAsExpander
                      showExpandableButton
                    />
                    {notes &&
                        <CardText expandable>
                            {notes}
                        </CardText>
                    }
                    <CardActions expandable>
                        <FlatButton
                          label="Endre vekt"
                          onTouchTap={this.onEditValue}
                          primary
                        />
                        <FlatButton
                          label="Endre øvelse"
                          onTouchTap={this.onEditLabel}
                          secondary
                        />
                    </CardActions>
                </Card>
                <Dialog
                  actions={actions}
                  modal={false}
                  onRequestClose={this.onClose}
                  open={editValue || editLabel}
                  title={editLabel ? 'Endre øvelse' : 'Endre vekt'}
                >
                    <TextField
                      defaultValue={editLabel ? fieldLabel : (fieldValue || '')}
                      id="input"
                      name={fieldName}
                      ref="input"
                      type="tel"
                    />
                    {editLabel &&
                        <TextField
                          defaultValue={notes}
                          floatingLabelText="Notater"
                          ref="notes"
                        />
                    }
                </Dialog>
            </div>
        );
    }
}

RypField.propTypes = {
    expanded: PropTypes.bool.isRequired,
    fieldLabel: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    fieldValue: PropTypes.number,
    onExpandChange: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onLabelChange: PropTypes.func.isRequired,
    notes: PropTypes.string.isRequired,
};

export default RypField;
