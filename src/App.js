import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom"; // this is all defined in index.js
import Display from "./components/Display";
import Form from "./components/Form";

function App() {

// const url  = "https://localhost:4500" // variable to hold url
const url = "https://ihdogsbackend.herokuapp.com"
const [dogs, setDogs] = React.useState([]) // store API data. the hook to hold state. initialize empty array

const emptyDog = {
  name: "", 
  age: 0,
  img: ""
}

// CRUD // Create Read Update Delete

// U // update
const [selectedDog, setselectedDog] = React.useState(emptyDog) //selectedDog state will represent dog to be edited

const handleUpdate = (dog) => {
  fetch(`${url}/dog/${dog._id}`, { // can't do a put request like in express, so fetch requires...
    method: "put",                 // ...these method and header objects
    headers: {
      "Content-Type": "application/json" // this is like the address, telling that the body of the request is json
    },
    body: JSON.stringify(dog) //stringigfy only works if the header matches it
  })
  .then(response => getDogs())  // this makes it be synchronous first the fetch, then this
}

const selectDog = (dog) => { // Set the state when you select a dog to edit. this will get put in Display as props
  setselectedDog(dog)
}

// R // read
const getDogs = () => { // function to get dogs via API
  fetch(`${url}/dog/`)
  .then(response => response.json())
  .then(data => { // "data" can be called anything
    console.log(data)
    setDogs(data)
  })
}

React.useEffect(() => { // useEffect to run initial call of getDogs
  getDogs()
}, []) // empty array to prevent eternal loop of calls

// C // create
const handleCreate = (newDog) => { // this is to create dogs
  fetch(`${url}/dog/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newDog)
  }).then(response => {
    getDogs()
  })
}

// D // Delete
const deleteDog = (dog) => {
  fetch(`${url}/dog/${dog._id}`, {
    method: "delete",
  })
  .then(response => getDogs())
}


  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch> {/* switch makes it so only one route shows at a time. it switches between each one */}
          <Route exact path="/" render={(rp) => <Display selectDog={selectDog} {...rp} dogs={dogs} deleteDog={deleteDog}/>} /> {/* this is the root path. taking dogs state from useState, putting it in curly brackets as the data, and calling it dogs, to pass it down as props to the Display.js. we will call this "dogs" in Display.js when we want to refer to props */}
          <Route // this is the create route
            exact
            path="/create"
            render={(rp) => ( // rp = router props. this is from the Route/React library
              <Form {...rp} label="create" dog={{emptyDog}} handleSubmit={handleCreate} />
            )}
          />
          <Route // this is the edit route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
