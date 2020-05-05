import React, {useEffect, useState } from 'react';
import { ListItem } from '@material-ui/core';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { startOfToday} from "date-fns";
import Seekbar from "./Seekbar"

function CovidMap  ({onPatientMarkerClicked,handleclickList}){
    const today = startOfToday();
    const [patients, setPatients] = useState([]);
    const [positionP, setPositionP] = useState([15.762887, 106.6800684]);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [zoomDefault,setZoomDefault] = useState(5);
    const [datevalue, setDatevalue] = useState(today);


    const handleclickMoveMap = (a) => {
        setPositionP ([a.lat, a.lng])
        setZoomDefault (20)
    };

    const handleListItemClick = (event, index, i) => {
        setSelectedIndex(index);
    };

    function compare(a, b) {
        let comparison = 0;
        if (a.verifyDate > b.verifyDate) {
            comparison = -1;
        } else if (a.verifyDate < b.verifyDate) {
            comparison = 1;
        }
        return comparison;
    }

    const handleTransdatevalue = (datevalueS) => {
        setDatevalue(datevalueS)
        setZoomDefault(5);
    }
    const handleTransPosotion = ([PositionValuelat,PositionValuelng]) => {
        setPositionP([PositionValuelat,PositionValuelng]);
    }
    const handleTranszoomDefault = (ZoomValue) => {
        setZoomDefault(ZoomValue);
    }
    
    
    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    setPatients(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
    }, [])

    const listItems = [].concat(patients)
                        .sort(compare)
                        .map((d,i) => {
                            if (Date.parse(d.verifyDate) <= Date.parse(datevalue))
                                    return <ListItem selected={selectedIndex === (d.name + d.address)} button onClick={(event) => {handleclickList(d);handleclickMoveMap(d);handleListItemClick(event, (d.name + d.address))}} > <li>{d.name} - {d.address}</li></ListItem>
                                });            
    return <div><Map center={positionP} zoom={zoomDefault}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
            />
    {patients
        .sort(compare)
        .map((patient,i) => {
            if (Date.parse(patient.verifyDate) <= Date.parse(datevalue))
            return (
            <Marker position={[patient.lat, patient.lng]} onClick={(event) => {handleclickList(patient);handleListItemClick(event, (patient.name + patient.address), i)}}>
                <Popup>
                    <ul>
                        <li>Name: {patient.name}</li>
                        <li>Address: {patient.address}</li>
                        <li>Note: {patient.note}</li>
                        <li>Verify date: {patient.verifyDate}</li>
                    </ul>
                </Popup>
            </Marker>)
            })
    }
    </Map>
    <div id="list">
        <Seekbar handleTransdatevalue={handleTransdatevalue} handleTransPosotion={handleTransPosotion} handleTranszoomDefault={handleTranszoomDefault}></Seekbar>
        <br/>
        Danh sách người nhiễm nCovid - 19:
        <ul>
            {listItems}
        </ul>
    </div></div>;
};


export default CovidMap;
