import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { Link } from 'react-router';

import PromoRegisterForm from './imports/promo-register-form';

RegisterPromoCode = class RegisterPromoCode extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Register with a Promo Code'/>

        <Grid>
          <Grid.Column>
            <PromoRegisterForm />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
