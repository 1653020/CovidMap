import React from "react";
import { Container } from "@material-ui/core";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChartVN from "./ChartVN"
import ChartGlobal from "./ChartGlobal"

function stats () {
    return <Container> 
        <Row>
            <Col><h2>Việt Nam</h2>
                <ChartVN />
            </Col>
            <Col><h2>Thế giới</h2>
                <ChartGlobal />
            </Col>
        </Row>
    </Container>
}

export default stats;