import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KeyValuePair from 'helpers/KeyValuePair';
// import { ICurrentUser } from 'helpers/interfaces';


interface IApplicationContext {
    isLoading: boolean
    bookCategories: KeyValuePair<string, string>[]
    // currentUser: ICurrentUser
}

export let applicationContext = React.createContext({} as IApplicationContext);

let { Provider } = applicationContext;

let ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    let [isLoading, setLoading] = useState(true);
    // let [currentUser, setCurrentUser] = useState({} as ICurrentUser);
    let [bookCategories, setBookCategories] = useState<KeyValuePair<string, string>[]>([]);

    useEffect(() => {
        let getApplicationData = async () => {
            try {
                setLoading(true);

                let res = await axios.get('/api/Application/GetData');

                let { item } = res.data;
                // setCurrentUser(item.currentUser);
                setBookCategories(item.bookCategories);
            } catch (err) { }
            finally {
                setLoading(false);
            }
        }

        getApplicationData();
    }, []);



    return (
        <Provider value={{
            isLoading,
            bookCategories,
            // currentUser
        }}>
            {children}
        </Provider>
    )
}

export default ApplicationProvider;