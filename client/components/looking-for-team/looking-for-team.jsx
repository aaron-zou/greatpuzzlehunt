import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container } from 'semantic-ui-react';

import Users from './imports/users';

LookingForTeam = class LookingForTeam extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Players Looking for a Team' subtitle='Find a team or more players'/>
        <Users/>
      </Container>
    );
  }
}
