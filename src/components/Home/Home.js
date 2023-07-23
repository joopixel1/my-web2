import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import './Home.css'

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
        <div className='home'>
            {/* <Card style={{ margin: '20px', width: '95%', padding: '20px' }}>
                <Card.Body class='text-center p-2'>
                    <img 
                        style={{ borderRadius: "50%", width: 300, height: 300, background: "red", display: "block"}}
                        src='images/me.jpg'
                    />
                    <h2>👋 Hey there! </h2>
                </Card.Body>
            </Card> */}
            <Card style={{ margin: '20px', width: '95%', padding: '10px' }}>
                <Card.Body class='text-center p-2'>
                    <Card.Title className="mb-3 display-4">About</Card.Title>
                    <Card.Text>
                    👋 Hey there! I'm an undergraduate software engineer at Iowa State University, with a passion for tackling complex problems through innovative solutions. My expertise lies in web development and object-oriented programming, where I create dynamic and responsive websites that leave people in awe.
                        <br></br><br></br>
                        Collaboration is my secret sauce! I thrive in team environments, working closely with others to deliver outstanding results. Whether it's debugging code, enhancing user experience, or unleashing new features, I'm all about creating software that blows minds!
                        <br></br><br></br>
                        But hey, it's not all work and no play! I'm a Computer Engineering student with a knack for robotics. I'm absolutely smitten with C, C++, Arduino, Python, and all things open source. Technology fuels my excitement, but so does adventure!
                        <br></br><br></br>
                        Right now, I'm diving into the world of embedded software and PCB design with the PrISUm Solar Car Team. Talk about an electrifying experience! I'm always up for a challenge, from squashing bugs to making critical design decisions. Research and determination are my superpowers when it comes to overcoming project roadblocks.
                        <br></br><br></br>
                        My goal? To develop mind-blowing tech that pushes the boundaries of what's possible! I'm on a constant quest for growth, learning, and innovation. If you share the same passion for pushing the limits, let's connect and embark on this amazing journey together.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ margin: '20px', width: '95%', padding: '10px' }}>
                <Card.Body class='text-center p-2'>
                    <Card.Title className="mb-3 display-4">Skills</Card.Title>
                    <Card.Text>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/c/c.png" height="100" padding='5px'/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/cpp/cpp.png" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/php/php.png" height="100"/>
                        <br/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/java/java.png" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/kotlin/kotlin.png" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/typescript/typescript.png" height="100"/>
                        <br/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/css/css.png" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" height="100" />
                        <br/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height="100"/>
                        <img alt='pl' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" height="100" />
                        <img alt='pl' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg" height="100" />
          

                        
                    </Card.Text>
                </Card.Body>
            </Card>
            {apiResponse}
        </div>
    )    
};