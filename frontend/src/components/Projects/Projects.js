import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MdViewer from '../MdViewer/MdViewer';
import Box from '../Box/Box'
import Data from './Data'
import { MobileContext } from '../MobileContext/MobileContext';


export default function Projects() {
    
    const data = Data.data;

    return (
        <Routes>
            <Route exact path={`/`} element={<Box data={data}/>} />
            {
                Object.values(data).flat().map( (e, i) => {
                    return (<Route key={i} exact path={`/${e.title}`} element={ <MobileContext.Consumer>
                        { (value) => (<MdViewer markdown={e.page} isMobile={value.isMobile} width={value.size}/>) }
                    </MobileContext.Consumer>   } />)
                })
            }
        </Routes>
    );

}