import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from '../Screens/index';
import Check from '../Screens/check';

function router() {
    return (
        <Router>
            <Route exact path="/" component={Main} />
            <Route path="/check" component={Check} />
        </Router>
    )
}

export default router