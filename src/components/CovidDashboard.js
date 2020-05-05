import React, { useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PatientInfo from "./PatientInfo";
import CovidMap from "./CovidMap";

const CovidDashboard = (props) => {
    const [currentPatient, setCurrentPatient] = useState();
    const patientMarkerClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }
    console.log('Covid Dashboard render');
    return <div>
        <Row id="styleCol">
            <Col xs={9}><div><CovidMap handleclickList={patientMarkerClickedHandler}/></div></Col>
            <Col xs={3}>
                Thông tin người nhiễm: 
                <div id="info" >{currentPatient && <PatientInfo name={currentPatient.name} address={currentPatient.address} note={currentPatient.note}
                                verifyDate={currentPatient.verifyDate}/>}</div>
            </Col>
        </Row>
        </div>
};

export default CovidDashboard;
