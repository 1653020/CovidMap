import React from 'react';
import './App.css';
import CovidDashboard from "./components/CovidDashboard";
import Stats from "./components/stats"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Switch, Route, Link } from "react-router-dom";

function App() {
    return ( <>
        <Row id = "rowRoute">
            <Col><Link style={{ textDecoration: 'none', color:'black'}} to="/CovidMap/map"><h2 id="linkroute">Bản đồ việt nam</h2></Link></Col>
            <Col><Link style={{ textDecoration: 'none', color:'black'}} to="/CovidMap/stats"><h2 id="linkroute">Đồ thị số ca mắc</h2></Link></Col>
        </Row>

        <Switch>
            <Route exact path="/CovidMap">
                <CovidDashboard / >
            </Route>
            <Route path="/CovidMap/map">
                <CovidDashboard / >
            </Route>
            <Route path="/CovidMap/stats">
                <Stats / >
            </Route>
        </Switch>
    </>
    );   
}

export default App;