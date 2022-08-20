import React from "react";

class ControlledTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "the value of textarea",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  }
  render() {
    return <textarea value={this.state.value} onChange={this.handleChange} />;
  }
}

class ControlledForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("submit:" + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class ControlledSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1value",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  render() {
    const options = [1, 2, 3, 4, 5, 6];
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {options.map((num) => (
          <option key={num.toString()} value={num.toString() + "value"}>
            {num.toString() + "value" + "-content"}
          </option>
        ))}
      </select>
    );
  }
}

class ControlledComponents extends React.Component {
  render() {
    return (
      <div>
        <ControlledForm />
        <ControlledTextArea />
        <ControlledSelect />
        <input type="text" value="hi" />
      </div>
    );
  }
}

export { ControlledComponents };
