import React, { useContext } from 'react'
import {useTheme, useTHemeUpdate} from './ThemeContext'

function FunctionContextComponent() {
    const darkTheme = useTheme();
    const toggleTheme = useTHemeUpdate()

    const themeStyles ={
        backgroundColor: darkTheme ? '#333' : '#ccc',
        color: darkTheme ? '#ccc' : '#333',
        padding: '2rem',
        margin: '2rem',
    }
  return (
    <>
    <button onClick={toggleTheme}>Toggle THeme</button>
    <div style={themeStyles}>FunctionContextComponent</div>
    </>
  )
}

export default FunctionContextComponent