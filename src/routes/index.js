import React from 'react';
import { Route } from 'react-router';

import Root from './Root';
import TotalWorkingTime from './TotalWorkingTime';
import CheckInList from './CheckInList';

export default (
  <Route component={Root}>
    <Route path="/" component={TotalWorkingTime} />
    <Route path="/check-ins/:key" component={CheckInList} />
  </Route>
);
