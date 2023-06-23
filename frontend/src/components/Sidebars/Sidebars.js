import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoSmiley } from 'react-icons/go';
import { IoLogoGithub, IoMdMail, IoLogoLinkedin } from 'react-icons/io';
import { push as Menu } from "react-burger-menu";

import { MobileContext } from '../MobileContext/MobileContext';
import './Sidebars.css';


export default class Sidebars extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            sections: ['Projects', 'Writing', 'Resume', ],
        };
    }


    render(){
        return (
            <MobileContext.Consumer>
                { (value) => (
                <Menu 
                    pageWrapId={this.props.pageWrapId} 
                    outerContainerId={this.props.outerContainerId} 
                    isOpen={!value.isMobile}
                    {...((value.isMobile) ? null : {customCrossIcon: false})}
                    noOverlay={true}
                    disableOverlayClick={true}
                    width={250}
                    >

                    <NavLink 
                        className={({isActive, isPending}) => isActive ? "active" : "sidebarElement"}
                        to={`/`}
                    >
                        <div className={"profile"} >
                            <span className={"photocontainer"}>
                                <GoSmiley size={100}/>
                            </span>
                            <span className={"title"}>
                                Jesutofunmi<br></br>Obimakinde
                            </span>
                            <hr></hr>
                        </div>
                    </NavLink>

                    {this.state.sections.map( (e, i) => (
                        <NavLink
                            key={i}
                            className={({isActive, isPending}) => isActive ? "active" : "sidebarElement"}
                            to={`/${(e==='Home') ? '' : e}`}
                            title={e}
                        >
                            <span className={"title"}>{e}</span>
                        </NavLink>

                    ))}
                    

                    <><div className='nin'>
                        <hr></hr>
                        <a href={"https://github.com/joopixel1/"} target='_blank' rel='noreferrer'><IoLogoGithub size={25}/></a>{"  "}
                        <a href={"mailto:lollipopobimak@gmail.com"} target='_blank'  rel='noreferrer'><IoMdMail size={25}/></a>{"  "}
                        <a href={"https://www.linkedin.com/in/jesutofunmi-obimakinde-015aa2240/"} target='_blank'  rel='noreferrer'><IoLogoLinkedin size={25}/></a>
                    </div></>
                </Menu>
                )}
            </MobileContext.Consumer>
        );
    
    }

}