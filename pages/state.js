import { createContext, useState } from "react";
import FunctionContextComponent from "./FunctionContextComponent";
import { ThemeProvider } from "./ThemeContext";

export default function State() {
  
    return (
        <>
            <ThemeProvider>
                <FunctionContextComponent />
            </ThemeProvider>
        </>
    )
}