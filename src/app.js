import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components';
import { Home, Launches, LaunchPads, Launch, LaunchPad } from './pages';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </Layout>
  );
}
