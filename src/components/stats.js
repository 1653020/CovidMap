import React from "react";
import { Container } from "@material-ui/core";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChartVN from "./ChartVN"
import ChartGlobal from "./ChartGlobal"

function stats () {
    return <> 
        <Row>
            <Col xs="6"><h2 id="text">Việt Nam</h2>
                <ChartVN />
            </Col>
            <Col xs="6"><h2 id="text">Thế giới</h2>
                <ChartGlobal />
            </Col>
        </Row>
    </>
}

export default stats;