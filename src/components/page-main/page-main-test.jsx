import React from 'react';
import ReactDOM from 'react-dom';

import { PageMain } from './page-main';

function getContainer() {
    return document.getElementById('container');
}

describe('page-main component', () => {
    beforeEach(() => {
        let domContainerNode = document.createElement('div');
        domContainerNode.setAttribute('id', 'container');
        document.body.appendChild(domContainerNode);
    });

    afterEach(() => {
        let domContainerNode = getContainer();
        document.body.removeChild(domContainerNode);
    });

    it('should render without problems', () => {
        let domContainerNode = getContainer();
        let pageMain = ReactDOM.render(<PageMain />, domContainerNode);
        let pageMainNode = ReactDOM.findDOMNode(pageMain);

        expect(pageMain).to.exist;
        expect(pageMainNode).to.have.class('page-main');
    });
});
