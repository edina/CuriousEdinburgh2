import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Example from '../src/components/Example';

// Note: test renderer must be required after react-native.

/* global it */
it('renders correctly', () => {
  renderer.create(<Example />);
});
