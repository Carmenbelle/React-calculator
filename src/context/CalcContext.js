import React, {createContext, useState} from 'react'


export const CalcContext = createContext()
const CalProvider = ({children}) => {

    const [calc, setCalc] = useState({
        sign: '',
        num: 0,
        res: 0
    });

    const providerValue = {
        calc, setCalc
    }

  return (
    <div>
        <CalcContext.Provider value={providerValue}>
            {children}
        </CalcContext.Provider>
    </div>
  )
}

export default CalProvider