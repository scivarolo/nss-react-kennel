import React, { Component } from 'react';

class AnimalList extends Component {
  render() {
    return (
      <article>
        <h1>Animal List</h1>
        {
          this.props.animals.map(animal => {
            return <div key={animal.id}>
              <h4>{animal.name}</h4>
            </div>
          })
        }
      </article>
    )
  }
}

export default AnimalList;