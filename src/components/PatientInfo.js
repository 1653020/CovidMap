import React from 'react';

const PatientInfo = ({name, address, note, verifyDate}) => {
    return <ul>
        <li>Name: {name}</li>
        <li>Address: {address}</li>
        <li>Note: {note}</li>
        <li>Verify Date: {verifyDate}</li>
    </ul>
};

export default PatientInfo;