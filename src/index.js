// https://zh-hans.reactjs.org/tutorial/tutorial.html

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// 如果你想写的组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单。
function Square(props) {
  return (
    <button className="square" onClick={() => props.onclick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // this.props是从父组件传过来的变量
  // this.state则需要在constructor中自己定义
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onclick={() => this.handleClick(i)}
      />
    );
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    // 出现胜者，不做处理
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    // this.state.xIsNext = !this.state.xIsNext; Do not mutate state directly. Use setState()
    // 通过替换对象的方式，而不是每次都改变底层数据，可以做到一次渲染就能更新所有值，
    // 优化性能
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  render() {
    let status;
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player" + (this.state.xIsNext ? "X" : "O");
    }
    console.log("render");
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
