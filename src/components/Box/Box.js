import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Box.css';

export default class Box extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    }

    capitalize = (s) => s[0].toUpperCase() + s.slice(1);    

    render(){
        return (
            <div className='con'>

                {
                    Object.entries(this.props.data).map( ([k, v], i) => (
                        <React.Fragment key={i}>
                            <h2>{this.capitalize(k)}</h2>
                            <div className='bx'>
                                {
                                    v.map( (e, i) => (
                                        <Link key={i} to={e.link} style={{ margin:'20px' }}>
                                        <Card  style={{ height: '30rem', width: '18rem', border:'1px solid #8a7b91'}} bg='light' className="mb-2" >
                                            <Card.Img variant="top" src={e.img} style={{ width: '100%', height: '12rem' }}/>
                                            <Card.Body>
                                                <Card.Title>{this.capitalize(e.title)}</Card.Title>
                                                <Card.Text>{e.desc}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                        </Link>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        );
    }

}