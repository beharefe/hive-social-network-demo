import React from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Info from "./components/Info";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Proposals from "./pages/Proposals";
import Post from "./pages/Post";

const App = () => {
  return (
    <React.Fragment>
      <Nav />

      {/* Routes */}
      <section className="grid grid-cols-4 gap-4">
        <main className="col-span-3">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/trending-communities/:communityName" exact component={Community}/>
            <Route path="/trending-communities/posts/:author/:permlink" exact component={Post}/>
            <Route
              path="/proposals"
              exact
              component={Proposals}
            />
          </Switch>
        </main>

        {/* Info section */}
        <Info />
      </section>
    </React.Fragment>
  );
};

export default App;
