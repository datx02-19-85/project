import React from 'react';

class Verifier extends React.Component {
  constructor() {
    super();
    this.state = {
      codes: ['23asdg2'],
      count: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    this.setState({
      codes: this.state.codes.push(this.state.count)
    });
    console.log(this.state.codes[1]);
  }

  handleChange(event) {
    this.setState({
      count: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Your key:{' '}
        <input type="text" className="voteInput" onChange={this.handleChange} />
        <h1>{this.state.count}</h1>
        <button> Verify </button>
      </form>
    );
  }
}

export default Verifier;
