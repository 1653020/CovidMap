import React, {useEffect, useState, useRef } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { subDays, startOfToday, format } from "date-fns";
import { scaleTime } from "d3-scale";
import { SliderRail, Handle, Track, Tick } from '../components/seekbarComponent';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const sliderStyle = {
    position: "relative",
    width: "100%"
};


function formatTick(ms) {
    return format(new Date(ms), "MMM dd");
}

const halfHour = 1000 * 60 * 60 * 12;

function Seekbar ({handleTransdatevalue,handleTransPosotion,handleTranszoomDefault}){
    const today = startOfToday();
    const BeginDay = subDays(Date.parse("2019-08-12T00:00:00"), 0);
    const [Selected,setSelected] = useState(today);
    const [updated, setUpdated] = useState(today);
    const [min] = useState(BeginDay);
    const [max] = useState(today);
    const [isActive, setIsActive] = useState(false);

    const onChange = ([ms]) => {
        setSelected(new Date(ms));
    }
    const onUpdate = ([ms]) => {
        setUpdated (new Date(ms));
        handleTransPosotion([15.762887, 106.6800684]);
        handleTranszoomDefault (5);
        handleTransdatevalue(new Date(ms));
    };

    const renderDateTime = (date, header) => {
        return (
            <div
                style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "Arial",
                margin: 5
            }}>
            <b>{header}:</b>
            <div style={{ fontSize: 12 }}>{format(date, "yyyy-MM-dd h:mm a")}</div>
            </div>
        );
    };

    const Stick = () => {  
        if (Selected < today) {
            setSelected(new Date(Date.parse(Selected)+halfHour));
            setUpdated(new Date(Date.parse(Selected)+halfHour));
            handleTransdatevalue(new Date(Date.parse(Selected)+halfHour));
        }
        else {
            setIsActive(!isActive);
        }
    } 
    
    useInterval(() => Stick(),isActive ? 1000 : null);

    function toggle() {
        setIsActive(!isActive);
        handleTranszoomDefault (5);
        handleTransPosotion([15.762887, 106.6800684]);
    }
    const dateTicks = scaleTime()
        .domain([min, max])
        .ticks(8)
        .map(d => +d);

        
    return <div>
    <Row>
            <Col xs={1}><button id="playpause" className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={()=>{toggle()}}>
                        {isActive ? 'Pause' : 'Play'}
        </button></Col>
            <Col xs={11}>
            <div>
        {renderDateTime(updated, "Current Day")}
        <div style={{ margin: "2%", height: 6, width: "90%" }}>
            <Slider
                mode={1}
                step={halfHour}
                domain={[+min, +max]}
                rootStyle={sliderStyle}
                onUpdate={onUpdate}
                onChange={onChange}
                values={[+Selected]}>
                <Rail>
                    {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                </Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div>
                        {handles.map(handle => (
                        <Handle
                            key={handle.id}
                            handle={handle}
                            domain={[+min, +max]}
                            getHandleProps={getHandleProps}
                        />
                        ))}
                        </div>
                )}
                </Handles>
                <Tracks right={false}>
                    {({ tracks, getTrackProps }) => (
                    <div>
                            {tracks.map(({ id, source, target }) => (
                        <Track
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                        />
                        ))}
                    </div>
                )}
                </Tracks>
                <Ticks values={dateTicks}>
                    {({ ticks }) => (
                    <div>
                        {ticks.map(tick => (
                        <Tick
                            key={tick.id}
                            tick={tick}
                            count={ticks.length}
                            format={formatTick}
                        />
                        ))}
                    </div>
                    )}
                </Ticks>
            </Slider>
        </div>
        </div>
            </Col>
        </Row>
    </div>;
}


function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
    function tick() {
        savedCallback.current();
    }
    if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }
    }, [delay]);
}

export default Seekbar;