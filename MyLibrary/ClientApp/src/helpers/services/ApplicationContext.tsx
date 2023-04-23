import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KeyValuePair from 'helpers/KeyValuePair';


interface IApplicationContext {
    isLoading: boolean
    bookCategories: KeyValuePair<string, string>[]
}

export let applicationContext = React.createContext({} as IApplicationContext);

let { Provider } = applicationContext;

let ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    let [isLoading, setLoading] = useState(true);
    let [bookCategories, setBookCategories] = useState<KeyValuePair<string, string>[]>([]);

    useEffect(() => {
        let getApplicationData = async () => {
            try {
                setLoading(true);

                let res = await axios.get('/api/Application/GetData');

                let { item } = res.data;
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
            bookCategories
        }}>
            {children}
        </Provider>
    )
}

export default ApplicationProvider;