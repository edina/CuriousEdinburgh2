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

    const tr = <TourRecord ref={(c) => { this.modal = c; }} />;

    const component = renderer.create(tr);
    this.modal.show(record);
    expect(component).toMatchSnapshot();

    const compJSON = component.toJSON();

    // header
    const header = compJSON.children[1];
    expect(header.children[0].children[1].children[0]).toEqual(TITLE);

    const body = compJSON.children[2];

    // there are 3 pieces of media
    const media = body.children[0];
    expect(media.children.length).toEqual(3);

    const video = media.children[0];
    expect(video.children[0].props.source.uri).toEqual(VIDEO);

    const firstImage = media.children[1];
    expect(firstImage.children[0].props.source.uri).toEqual(IMG1);

    const secondImage = media.children[2];
    expect(secondImage.children[0].props.source.uri).toEqual(IMG2);

    // associated links
    const links = body.children[1].children[3];
    expect(links.children[0].children[0].children[0]).toEqual(L1);
    expect(links.children[1].children[0].children[0]).toEqual(L2);
    expect(links.children[2].children[0].children[0]).toEqual(L3);
});
