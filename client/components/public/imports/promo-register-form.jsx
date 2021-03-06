import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment, Form, Button, Icon, List, Message } from 'semantic-ui-react';

import GamestateComp from '../../imports/gamestate-comp';

const STATES = [
  { key: 'WA', text: 'WA', value: 'WA' },
  { key: 'AL', text: 'AL', value: 'AL' },
  { key: 'AK', text: 'AK', value: 'AK' },
  { key: 'AS', text: 'AS', value: 'AS' },
  { key: 'AZ', text: 'AZ', value: 'AZ' },
  { key: 'AR', text: 'AR', value: 'AR' },
  { key: 'CA', text: 'CA', value: 'CA' },
  { key: 'CO', text: 'CO', value: 'CO' },
  { key: 'CT', text: 'CT', value: 'CT' },
  { key: 'DE', text: 'DE', value: 'DE' },
  { key: 'DC', text: 'DC', value: 'DC' },
  { key: 'FM', text: 'FM', value: 'FM' },
  { key: 'FL', text: 'FL', value: 'FL' },
  { key: 'GA', text: 'GA', value: 'GA' },
  { key: 'GU', text: 'GU', value: 'GU' },
  { key: 'HI', text: 'HI', value: 'HI' },
  { key: 'ID', text: 'ID', value: 'ID' },
  { key: 'IL', text: 'IL', value: 'IL' },
  { key: 'IN', text: 'IN', value: 'IN' },
  { key: 'IA', text: 'IA', value: 'IA' },
  { key: 'KS', text: 'KS', value: 'KS' },
  { key: 'KY', text: 'KY', value: 'KY' },
  { key: 'LA', text: 'LA', value: 'LA' },
  { key: 'ME', text: 'ME', value: 'ME' },
  { key: 'MH', text: 'MH', value: 'MH' },
  { key: 'MD', text: 'MD', value: 'MD' },
  { key: 'MA', text: 'MA', value: 'MA' },
  { key: 'MI', text: 'MI', value: 'MI' },
  { key: 'MN', text: 'MN', value: 'MN' },
  { key: 'MS', text: 'MS', value: 'MS' },
  { key: 'MO', text: 'MO', value: 'MO' },
  { key: 'MT', text: 'MT', value: 'MT' },
  { key: 'NE', text: 'NE', value: 'NE' },
  { key: 'NV', text: 'NV', value: 'NV' },
  { key: 'NH', text: 'NH', value: 'NH' },
  { key: 'NJ', text: 'NJ', value: 'NJ' },
  { key: 'NM', text: 'NM', value: 'NM' },
  { key: 'NY', text: 'NY', value: 'NY' },
  { key: 'NC', text: 'NC', value: 'NC' },
  { key: 'ND', text: 'ND', value: 'ND' },
  { key: 'MP', text: 'MP', value: 'MP' },
  { key: 'OH', text: 'OH', value: 'OH' },
  { key: 'OK', text: 'OK', value: 'OK' },
  { key: 'OR', text: 'OR', value: 'OR' },
  { key: 'PW', text: 'PW', value: 'PW' },
  { key: 'PA', text: 'PA', value: 'PA' },
  { key: 'PR', text: 'PR', value: 'PR' },
  { key: 'RI', text: 'RI', value: 'RI' },
  { key: 'SC', text: 'SC', value: 'SC' },
  { key: 'SD', text: 'SD', value: 'SD' },
  { key: 'TN', text: 'TN', value: 'TN' },
  { key: 'TX', text: 'TX', value: 'TX' },
  { key: 'UT', text: 'UT', value: 'UT' },
  { key: 'VT', text: 'VT', value: 'VT' },
  { key: 'VI', text: 'VI', value: 'VI' },
  { key: 'VA', text: 'VA', value: 'VA' },
  { key: 'WV', text: 'WV', value: 'WV' },
  { key: 'WI', text: 'WI', value: 'WI' },
  { key: 'WY', text: 'WY', value: 'WY' },
];

class PromoRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'register',
      firstname: '',
      lastname: '',
      email: '',
      promocode: '',
      age: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      photoPermission: false,
      ecName: '',
      ecRelation: '',
      ecPhone: '',
      ecAltPhone: '',
      holdHarmless: false,
    };
  }

  render() {
    if (!this.props.ready) {
      return <Loading/>
    } else if (this.props.gamestate.registration) {
      return this._renderMain();
    } else {
      return <Message
        info
        header='Registration is closed'
        content='The 2018 Great Puzzle Hunt is now in development!'
      />
    }
  }

  _renderMain() {
    switch (this.state.mode) {
      case 'thankyou':
        return this._thankyou();
      default:
        return this._form();
    }
  }

  _thankyou() {
    return (
      <Message icon>
        <Icon name='mail' color='green'/>
        <Message.Content>
          <Message.Header>Thank you for registering!<br/></Message.Header>
          <p>We've sent an email to { this.state.email } with a link to finish setting up your account!</p>
          <p>Once setup you will be able to join or create a team.</p>
        </Message.Content>
      </Message>
    );
  }

  _form() {
    return (
      <Form onSubmit={ (e) => this._register(e) } style={ this._formStyle() }>
        <h3><Icon name='user' color='green' size='big'/>Participant Info</h3>

        <Form.Group widths='equal'>
          <Form.Input name='firstname' label='First Name' placeholder='First Name' value={ this.state.firstname } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='lastname' label='Last Name' placeholder='Last Name' value={ this.state.lastname } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='email' type='email' label='Email' placeholder='youR@email.com' value={ this.state.email } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='promocode' label='Promo Code' placeholder='promo code' value={ this.state.promocode } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='age' label='Age' placeholder='##' value={ this.state.age } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='phone' label='Phone' type='phone' placeholder='111-222-33333' value={ this.state.phone } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='address' label='Street Address' placeholder='12345 6th Ave' value={ this.state.address } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='zip' label='Zip Code' placeholder='12345' value={ this.state.zip } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='city' label='City' placeholder='City' value={ this.state.city } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Select name='state' label='State' options={ STATES } value={ this.state.state } onChange={ (e,data) => this._handleDataChange(e,data) }/>
        </Form.Group>

        <Form.Checkbox
          toggle
          name='photoPermission'
          label='I hereby give my permission to Western to use my (or my minor child’s) image, in whole or in part, for public information and marketing of the WWU Great Puzzle Hunt at its discretion'
          onChange={ (e,data) => this._handleDataChange(e,data) }
        />

        <h3><Icon name='first aid' color='red' size='big'/>Emergency Contact <small>(optional)</small></h3>
        <Form.Group widths='equal'>
          <Form.Input name='ecName' label='Name' placeholder='John' value={ this.state.ecName } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='ecRelation' label='Relationship' placeholder='parent' value={ this.state.ecRelation } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='ecPhone' label='Primary Phone' placeholder='111-222-3344' value={ this.state.ecPhone } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='ecAltPhone' label='Alternative Phone' placeholder='123-123-1234' value={ this.state.ecAltPhone } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <h3><Icon name='pencil' color='orange' size='big'/>Acknowledgement of Risk & Hold Harmless Agreement</h3>
        { this._holdHarmlessButton() }
        { this._holdHarmless() }
        <Form.Checkbox
          toggle
          name='holdHarmless'
          label='By checking this box I acknowledge that I have read and understand the risk & hold harmless agreement and that I am either 18+ years old or a WWU student or the parent/ guardian of a minor participant.'
          onChange={ (e,data) => this._handleDataChange(e,data) }
        />

        <Form.Button type='submit' content='Register' color='green'/>

        { this._errorMessage() }
        <h3>Important Registration Information</h3>
        <List>
          <List.Item><strong>Participants under age 18 (minor child):</strong> A parent/legal guardian must complete this registration form on behalf of their minor child.</List.Item>
          <List.Item><strong>Participants under age 14:</strong> In addition to registering their minor child, a parent/legal guardian must also register as a member of a team with their under age 14 minor child and accompany them at all times during the Puzzle Hunt.</List.Item>
          <List.Item><strong>Purchase T-Shirts</strong> In addition to registering their minor child, a parent/legal guardian must also register as a member of a team with their under age 14 minor child and accompany them at all times during the Puzzle Hunt.</List.Item>
        </List>
      </Form>
    );
  }

  _formStyle() {
    return {
      maxWidth: '800px',
      marginRight: 'auto',
      marginLeft: 'auto',
    };
  }

  _register(e) {
    e.preventDefault();
    const data = this._registrationData();
    console.log('Going to register with:', data);

    Meteor.call('promo_codes.register', data, (error, result) => {
      if (error) return this.setState({ error });
      this.setState({ error: null, result, mode: 'thankyou' });
    });
  }

  _registrationData() {
    return {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      promocode: this.state.promocode,
      age: parseInt(this.state.age),
      phone: this.state.phone,
      address: this.state.address,
      zip: this.state.zip,
      city: this.state.city,
      state: this.state.state,
      ecName: this.state.ecName,
      ecRelation: this.state.ecRelation,
      ecPhone: this.state.ecPhone,
      ecAltPhone: this.state.ecAltPhone,
      photoPermission: this.state.photoPermission,
      holdHarmless: this.state.holdHarmless,
    };
  }

  _handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleDataChange(e, data) {
    const { name, value, checked } = data;
    // console.log(data);
    this.setState({ [name]: (value || checked) });
  }

  _handleCheckBoxChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
  }

  _holdHarmlessButton() {
    if (this.state.showHoldHarmless) {
      return <Button as='a' basic content='Hide Agreement' onClick={ (e) => this.setState({ showHoldHarmless: false }) }/>
    }
    else {
      return <Button as='a' basic content='Show Agreement' onClick={ (e) => this.setState({ showHoldHarmless: true }) }/>
    }
  }

  _holdHarmless() {
    if (!this.state.showHoldHarmless) return <p></p>;
    return (
      <Segment basic>
        <p>I hereby acknowledge that I have voluntarily chosen (or voluntarily chosen to allow my minor child) to participate in the WWU Great Puzzle Hunt 2017 sponsored by the WWU Mathematics Department, held on April 1, 2017 (hereinafter referred to as “Puzzle Hunt”).  I understand the risks involved in the Puzzle Hunt, including the unlikely but potential risk of injury to me (or my minor child), and I agree to accept any and all risks associated with my participation.</p>
        <p>In consideration of my (or my minor child’s) voluntary participation in the Puzzle Hunt, I agree to hold harmless Western Washington University, its officers, agents, volunteers, or employees from and against all financial loss, claim, suit, action, damage, or expense, arising out of my (or my minor child’s) participation, unless caused by the negligence or willful misconduct of the University, its officers, agents, volunteers, or employees.</p>
        <p>I understand that Western Washington University strongly recommends that participants have comprehensive health insurance that provides essential health benefits as required by the Affordable Care Act (ACA).</p>
        <p>I understand and acknowledge that a medical emergency may develop which necessitates the need for immediate medical treatment for a participant.  I hereby authorize Western and its officers, agents, volunteers or employees to arrange or provide any necessary emergency medical treatment on my (or my minor child’s) behalf.</p>
      </Segment>
    );
  }

  _errorMessage() {
    if (!this.state.error) return null;
    return <Message negative
      icon='warning'
      title='There were issues registering!'
      content={ this.state.error.reason }
      onDismiss={ (e) => this.setState({ error: null }) }
    />
  }
}

export default GamestateComp(PromoRegisterForm);
