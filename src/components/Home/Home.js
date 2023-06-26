import React, { useState, useEffect } from 'react';
import MdViewer from '../MdViewer/MdViewer';
import { MobileContext } from '../MobileContext/MobileContext';

export default function Home() {

    const [apiResponse, setApiResponse] = useState("");
    
    const callAPI = () => {
        fetch("http://localhost:4000/api")
            .then(res => res.text())
            .then(res => setApiResponse(res))
            .catch(err => console.log(err));
            
    }
    
    useEffect( () => {
        callAPI();

        return () => {}
    }, []);

    return (
            <MobileContext.Consumer>
                { (value) => 
                    (<MdViewer markdown={'/mds/home.md'} isMobile={true} width={value.size}>
                        <div>{apiResponse}</div>
                    </MdViewer>) }
            </MobileContext.Consumer> 
    )    
};