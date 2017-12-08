import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import TourRecord from '../TourRecord';

test('renders correctly', () => {
    const TITLE = 'test record';
    const VIDEO = 'https://www.youtube.com/watch?v=i64wvdnHSIw';
    const IMG1 = 'https://image1.png';
    const IMG2 = 'https://image2.png';
    const L1 = 'https://link1.html';
    const L2 = 'https://link2.html';
    const L3 = 'https://link3.html';

    const record = {
        title: TITLE,
        images: [IMG1, IMG2],
        additionalLinks: [L1, L2, L3],
        video: VIDEO,
    };

    jest.mock('WebView', () => {
        const RealComponent = require.requireActual('WebView');
        // eslint-disable-next-line
        const MockReact = require('React');
        class WebView extends MockReact.Component {
            render() {
                if (!this.props) {
                    return null;
                }
                return MockReact.createElement('WebView', this.props, this.props.children);
            }
        }
        WebView.propTypes = RealComponent.propTypes;
        return WebView;
    });

    // problem with decelerationRate, see
    // https://github.com/facebook/react-native/issues/12440
    jest.unmock('ScrollView');

    const tr = <TourRecord ref={(c) => { this.modal = c; }} />;

    /* eslint-disable no-unused-vars */
    //const component = renderer.create(tr);
    //this.modal.show(record);

    // expect(component).toMatchSnapshot();
});
