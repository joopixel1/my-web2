import React from 'react';

import './Dual.css';

export default class Dual extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      vis: {},
    };

    this.tames = React.createRef();
    this.tames.current = [];
    this.contentRef = React.createRef();
    this.scrollTimer = null;
  }

  componentDidMount() {
    if (!this.props.isMobile) {
      this.handleScroll();
      if (this.contentRef.current) this.contentRef.current.addEventListener('scroll', this.debouncedScroll);
    }
  }

  componentWillUnmount() {
    if (!this.props.isMobile) {
      if (this.contentRef.current) this.contentRef.current.removeEventListener('scroll', this.debouncedScroll);
      clearTimeout(this.scrollTimer);
    }
  }

  debouncedScroll =  () => {
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout (this.handleScroll, 100);
  }

  handleScroll = () => {
    let ans = { ...this.state.vis };
    let once = false;
    this.tames.current.forEach((targetElement, i) => {
      if (once){
        ans[i] = false;
      }
      else {
        const { top, bottom } = targetElement.getBoundingClientRect();
        const isVisible = top < window.innerHeight && bottom >= 0;
        ans[i] = isVisible;
        if (isVisible) once = true;
      }

    });
    this.setState({ vis: ans });
  };

  scrollToTarget = (i) => {
    this.tames.current[i].scrollIntoView({ behavior: 'smooth' });
  };


  scroller = () => {

    if (this.props.isMobile) {

      return (
          <div className={'text_mobile'} > {this.props.children} </div>
      );

    }
    else {

      let res = [];
      let a = [];

      React.Children.forEach(this.props.children, (child, i) => {
        if (child && child.type && /^h\d$/.test(child.type)) {
          const tame = node => this.tames.current[i] = node; 
          // This function will be passed our node that is stored in the pinterestRef.current at index "i"
          res.push(
            <span
              key={i}
              onClick={() => this.scrollToTarget(i)}
              {...(this.state.vis[i] ? { className: 'help' } : null)}
            >
              {'-'.repeat(parseInt(child.type.charAt(1)))}
              {child.props.children}
              <br></br>
            </span>
          );
          a.push(<div key={i} ref={tame}>{child}</div>);
        } else {
          a.push(<div key={i}>{child}</div>);
        }
      });

      return (<>
        {this.props.right
        ?
          <div className={'file'}>
            <div className={'text'} ref={this.contentRef}> {a} </div>
            <div className={'topic'}>{res}</div>
          </div>
        :
          <div className={'file'}>
            <div className={'topic'}>{res}</div>
            <div className={'text'} ref={this.contentRef}> {a} </div>
          </div>
        }
      </>);

    }

  };

  render() {
    return <>{this.scroller()}</>;
  }


}
