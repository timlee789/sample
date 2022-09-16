import { useState, useContext, createContext } from "react";

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

export function useTheme(){
    return useContext(ThemeContext)
}
export function useTHemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({children}) {
  
    const [darkTheme, setDarkTheme] = useState(true)

    function toggleTheme() {
         setDarkTheme(prevDarkTheme => ! prevDarkTheme)
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
            {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}