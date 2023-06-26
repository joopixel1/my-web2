import React from 'react';
import { TbError404 } from 'react-icons/tb';
import './Error.css';



export default class  Error extends React.Component{

    render () {
        return(
            <div className="error-page">
                <h1>Oops!</h1>
                <p>Error 404. Page not found.</p>
                <TbError404 size={100} color={'grey'}/>
            </div>
        )
    }

}    
