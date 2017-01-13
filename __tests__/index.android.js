import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Example from '../src/components/Example';


/* global it */
it('renders correctly', () => {
  renderer.create(<Example />);
});
