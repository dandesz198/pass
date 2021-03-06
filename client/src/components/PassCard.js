import React, { Component } from 'react';
import { route, view } from 'react-stax';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import colorPresets from '../assets/colorPresets';

// Icons
import PersonIcon from '../assets/person.png';

const onShow = keyframes`
  from {
    margin-top: 10px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  width: 50vw;
  height: 55vw;
  max-width: 180px;
  max-height: 198px;
  border-radius: 15px;
  box-shadow: 0 5px 20px #888;
  background-image: ${({ type }) => `linear-gradient(to bottom right, ${colorPresets[type][0]}, ${colorPresets[type][1]})`};
  color: #fff;
  padding: 1.25em !important;
  margin: 0 1em 0 0 !important;
  animation: ${onShow} 1s ease-in-out 1;
  transition: all 0.1s ease-in-out;
  :hover {
    box-shadow: '0 1px 5px #999';
  }
`;

const Text = styled.h1`
  font-size: 1.5em;
  font-weight: 800;
`;

const Image = styled.img`
  width: 3em;
  max-width: 2cm;
  margin-bottom: 0.5vw !important;
`;

const getIcon = type => {
  switch (type) {
    case 'private':
      return PersonIcon;
    case 'business':
      return PersonIcon;
    case 'pupil':
      return PersonIcon;
    case 'student':
      return PersonIcon;
    default:
      return PersonIcon;
  }
};

class PassCard extends Component {
  componentDidMount() {}

  render() {
    const {
      id, passType, name, price,
    } = this.props;
    return (
      <Container
        type={passType}
        key={id}
        onClick={() => route({ to: '/details', params: { id } })}
      >
        <Image alt="Logo" src={getIcon(passType)} />
        <Text>{name.en}</Text>
        <Text style={{ position: 'absolute', bottom: 15 }}>{`${price} HUF`}</Text>
      </Container>
    );
  }
}

PassCard.propTypes = {
  id: PropTypes.string.isRequired,
  passType: PropTypes.string.isRequired,
  name: PropTypes.objectOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
};

export default view(PassCard);
