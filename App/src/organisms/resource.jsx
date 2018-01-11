import React, { Component } from 'react';
import styled from 'styled-components';

import AddResource from '../molecules/addResource'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: fit-content(33.33%) fit-content(33%) 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1em;
`;

const AddResourceTile = styled.div`
  grid-area: 1 / 1 / 4 / 2;
`

class Resource extends Component {
  render() {
    return (
      <Wrapper>
        <AddResourceTile>
          <AddResource />
        </AddResourceTile>
      </Wrapper>
    );
  }
}

export default Resource;
