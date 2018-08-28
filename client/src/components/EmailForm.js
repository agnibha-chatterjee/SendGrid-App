import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import EmailFormField from './EmailFormField';
import FIELDS from './utils/FIELDS';
import axios from 'axios';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  renderForm() {
    return FIELDS.map(item => {
      return (
        <div key={item.key}>
          <Field
            type="text"
            placeholder={item.placeholder}
            name={item.name}
            key={item.key}
            component={EmailFormField}
          />
        </div>
      );
    });
  }
  submitForm(values) {
    axios.post('http://localhost:5000/send/email', values);
    alert('Sent');
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.submitForm(values))}
      >
        <div className="row" />
        {this.renderForm()}
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    );
  }
}

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmail = emails => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => emailRegex.test(email) === false);
  if (invalidEmails.length) {
    return `List of invalid emails are ${invalidEmails}`;
  }
  return null;
};

const validate = values => {
  let errors = {};
  errors.receiversEmail = validateEmail(values.receiversEmail || '');
  errors.sendersEmail = validateEmail(values.sendersEmail || '');
  FIELDS.forEach(({ name, placeholder }) => {
    if (!values[name]) {
      return (errors[name] = `${placeholder} is required.`);
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  form: 'emailform',
  destroyOnUnmount: false
})(EmailForm);
