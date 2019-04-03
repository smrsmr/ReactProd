import React from 'react';
import 'animate.css/animate.min.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
function wrapAnimation(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <TransitionGroup>
          <CSSTransition
            in={this.props.match !== null}
            classNames={{
              enter: 'animated',
              enterActive: 'fadeInDown',
              exit: 'animated',
              exitActive: 'fadeOutDown'
            }}
            timeout={1000}
            mountOnEnter
            unmountOnExit
          >
            <WrappedComponent {...this.props}  />
          </CSSTransition>
        </TransitionGroup>
      );
    }
  };
}
export default wrapAnimation;