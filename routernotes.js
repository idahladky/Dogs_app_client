//Method, custom props, but no router props
<Route path="/home">
    <Home dogs={dogs}/>
</Route>

//Method 2, get router props, no custom props
<Route path="/home" component={Home}/>

//Method 3, get BOTH!

<Route path="/home" render={(rp) => <Home {...rp} dogs={dogs}/>} />