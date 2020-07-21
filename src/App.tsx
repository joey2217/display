import React, { FC, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import Flex from "./pages/flex";
import AppHeader from './components/AppHeader'
import "./App.css";

const { Content, Footer } = Layout;

const App: FC = () => (
  <BrowserRouter>
    <Layout className="layout">
      <AppHeader />
      <Content style={{ padding: "0 10px" }}>
        <div className="site-layout-content">
          <Suspense fallback={"Loading"}>
            <Switch>
              <Route path="/flex" component={Flex} />
              <Route path="/grid" component={lazy(()=>import('./pages/grid'))} />
              <Route render={() => <Redirect to="/flex" />} />
            </Switch>
          </Suspense>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  </BrowserRouter>
);

export default App;
