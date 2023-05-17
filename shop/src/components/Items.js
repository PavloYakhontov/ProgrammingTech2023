import React, { Component } from 'react'
export class Items extends Component {
  render() {
    return (
      <main>
        {this.props.items.map(el => (
            <h1>{el.title}</h1>
        ))}
      </main>
    )
  }
}
export default Items