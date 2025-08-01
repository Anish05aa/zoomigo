import { createContext } from 'react';

export const AppContext = createContext();


const months = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const slotDateFormat = (slotDate) => {
  const dateArray = slotDate.split('_')
  return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
}
const currency="$"




const AppContextProvider = (props) => {

    const value = {
        // Define your context values here
        slotDateFormat,
        currency
    };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  
  )
}

export default AppContextProvider
