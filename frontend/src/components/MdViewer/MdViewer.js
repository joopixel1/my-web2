import React from 'react';
import PropTypes from 'prop-types';
import { ReactMarkdownOver } from '../react-markdown-override/react-mardown-over';

import Dual from './Dual';


export default class MdViewer extends React.Component {

    static propTypes = {
        markdown: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired,
        right: PropTypes.bool,
        width: PropTypes.number.isRequired,
    };

    static defaultProps = {
        right: false,
    };


    constructor(props) {
        super(props);
        this.state = {
            md: "",
            _loaded: false,
        }
    }

    componentDidMount () {
        fetch(this.props.markdown).then((response) => response.text()).then((text) => {
            this.setState({md: text, _loaded: true,});
        }) 
    }


    decoded = () => {
        const size = (this.props.isMobile) ? this.props.width-50 : (this.props.width-500)*0.75
        //ReactMarkdown accepts custom renderers
        const imageRenderers = {
            //This custom renderer changes how images are rendered
            //we use it to constrain the max width of an image to its container
            img: ({src, alt, title}) => <img src={src} alt={alt} title={title} width={size} height={size}/>
        };
        return ReactMarkdownOver({ children: this.state.md, escapeHtml:true, components: imageRenderers,  })
    }

    render(){
        return (<>
            {   
                this.state._loaded
                ?
                <Dual 
                    isMobile={this.props.isMobile} 
                    right={this.props.left}> 
                    {this.decoded()} 
                    {this.props.children} 
                </Dual> 
               :
               <></>
            }
            {this.p}
        </>);
    }

}

