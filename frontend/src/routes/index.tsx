import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../containers/Dashboard';
import Competitors from '../containers/Competitors';
import Tracks from '../containers/Tracks';
import Races from '../containers/Races';
import Reports from '../containers/Reports';

import PageLayout from '../containers/PageLayout'

const Routes: React.FC = () => (
  <PageLayout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/competitors" component={Competitors} />
      <Route path="/tracks" component={Tracks} />
      <Route path="/races" component={Races} />
      <Route path="/reports" component={Reports} />
    </Switch>
  </PageLayout>
);

export default Routes;