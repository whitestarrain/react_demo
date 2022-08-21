// 文档:https://zh-hans.reactjs.org/docs/hello-world.html
// 边学边做:https://zh-hans.reactjs.org/tutorial/tutorial.html

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ControlledComponents } from "./controlledComponent.js";

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
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onclick={() => this.props.onclick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      winner: null,
      stepNumber: 0
    };
  }

  handClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // 放过棋子格子不进行更新。
    // 出现胜者，不做处理
    if (squares[i] || this.state.winner) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const winner = calculateWinner(squares);
    if (winner) {
      this.setState({
        winner: winner
      });
    }
    // this.state.xIsNext = !this.state.xIsNext; Do not mutate state directly. Use setState()
    // 通过替换对象的方式，而不是每次都改变底层数据，可以做到一次渲染就能更新所有值，
    // 优化性能
    this.setState({
      history: history.concat({ squares: squares }),
      xIsNext: !this.state.xIsNext,
      winner: winner,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winner: calculateWinner(this.state.history[step].squares)
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner;
    // 变量可以指向jsx对象
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onclick={i => this.handClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            {
              // moves是jsx对象数组
              moves
            }
          </ol>
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
    [2, 4, 6]
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
root.render(
  <div>
    <Game />
    <ControlledComponents />
  </div>
);
