import React, {useEffect, useState }  from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Axios from 'axios';

const temp =[{
    name: String(),
    Nhiem: Number(),
    NghiNhiem: Number(),
    HoiPhuc: Number()
}]

function ChartVN () {
    const [Patients, setPatients] = useState({});
    const [items,setItems] = useState([{
        name: String(),
        Nhiem: Number(),
        NghiNhiem: Number(),
        HoiPhuc: Number()
    }])

    useEffect(() => {
        Axios.get("https://td.fpt.ai/corona/corona-chart-vn.json")
            .then(
                (result) => {
                    setPatients(result.data);
                    setItems(temp);
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

    const arrayOfObj = [].concat( Object.values(Patients));
    const arrayKeys = [].concat( Object.keys(Patients));
    
    if(temp[0].name === ""){
    for (let i=0; i<arrayKeys.length; i++){
        temp[i] = {
            name : arrayKeys[i],
            Nhiem : [].concat(arrayOfObj[i])[0],
            NghiNhiem : [].concat(arrayOfObj[i])[1],
            HoiPhuc : [].concat(arrayOfObj[i])[2]
        }
    }}

    return <LineChart
            width={600}
            height={500}
            data={items}
            margin={{
                top: 5, right: 30, left: 5, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Nhiem" stroke="#FF0000" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="NghiNhiem" stroke="#FFFF00" />
            <Line type="monotone" dataKey="HoiPhuc" stroke="#00FF00" />
        </LineChart>

}

export default ChartVN;
