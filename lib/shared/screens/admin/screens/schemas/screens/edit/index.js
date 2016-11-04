import * as schemaActions from 'actions/schema';
import Component from 'components/component';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import SchemaEdit from './components';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id
  }),
  (dispatch) => bindActionCreators(schemaActions, dispatch),
  (props) => ({
    fragments: SchemaEdit.fragments,
    variablesTypes: {
      schema: {
        id: 'ID!'
      }
    },
    initialVariables: {
      schema: {
        id: props.schemaId
      }
    }
  })
)
export default class SchemaEditContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired
  };

  getInitState () {
    const {schema} = this.props;
    if (schema) {
      this.props.editSchema(schema);
    }

    return {
      removeConfirm: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.schema !== nextProps.schema && nextProps.schema) {
      this.props.editSchema(nextProps.schema);
    }
  }

  @bind
  toggleRemoveConfirm () {
    this.setState({
      removeConfirm: !this.state.removeConfirm
    });
  }

  @bind
  confirmRemove () {

  }

  render () {
    const {
      loading,
      schema
    } = this.props;

    return (
      <SchemaEdit
        {...this.state}
        loading={loading}
        schema={schema}
        toggleRemoveConfirm={this.toggleRemoveConfirm}
        confirmRemove={this.confirmRemove}
      />
    );
  }
}