import React from 'react'
import { IndexLink  } from 'react-router'

const Header = () => {
    return (
        <div>
            <h1>Forward Technologies</h1>
            <IndexLink activeStyle={{display:'none'}} to='/'>Ver Delitos</IndexLink >
            <IndexLink activeStyle={{display:'none'}} to='/reportar'>Reportar Delito</IndexLink >
        </div>
    )
}

export default Header
