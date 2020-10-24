import React from "react";

const Display = (props) => {

  const {dogs} = props

  const loaded = () => ( // use parentheses instead of curly brackets
    <div style={{textAlign: "center"}}>
      {dogs.map((dog) => ( // use parentheses instead of curly brackets
        <article>
          <img src={dog.img}/>
          <h1>{dog.name}</h1>
          <h3>{dog.age}</h3>
          <button onClick={() => {
            props.selectDog(dog) // passing the dog as selectDog
            props.history.push("/edit")
          }} >Edit</button>
          <button onClick={() => {
            props.deleteDog(dog) // passing the dog as selectDog
          }} >Delete</button>

        </article>
      ))}
    </div>
  )

  const loading = <h1>Loading...</h1>

  return dogs.length > 0 ? loaded() : loading

};

export default Display;
