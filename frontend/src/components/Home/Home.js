import React, { useState, useEffect } from 'react';
import MdViewer from '../MdViewer/MdViewer';
import { MobileContext } from '../MobileContext/MobileContext';

export default function Home() {

    const [apiResponse, setApiResponse] = useState("");
    
    const callAPI = () => {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => setApiResponse(res));
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