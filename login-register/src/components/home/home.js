import React from 'react'
import "./home.css"

const Home=({setLoginUser})=>{
    return(
        <div className="home">
            <h1>Welcome Home</h1>
            <div className="button" onClick={()=>setLoginUser({})}>Logout</div>
        </div>
    )
}

export default Home