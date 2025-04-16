import React, { Component } from 'react';

class RenderResult extends Component {
  handleRestart = () => {
    window.location.reload();
  };

  render() {
    const { msg } = this.props;
    
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <p>You {msg}!!</p>
        <button onClick={this.handleRestart}>Restart</button>
      </div>
    );
  }
}

export default RenderResult;