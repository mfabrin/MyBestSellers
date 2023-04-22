
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

interface IContext {
    isLoading: boolean
    isSaving: boolean
    book: IBook

    updateBook: (newBook: IBook) => void
    saveBook: () => Promise<void>
}

interface IBook {
    isbn: string
    title: string
    author: string
    contributor: string
    image: string
}

export let bookContext = React.createContext({} as IContext);

let { Provider } = bookContext;

let BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let { id } = useParams<{ id: string }>();
    let location = useLocation();
    let navigate = useNavigate();

    let [isLoading, setLoading] = useState(true);
    let [isSaving, setSaving] = useState(false);

    let [book, setBook] = useState({} as IBook);


    useEffect(() => {
        let getBook = async (id: string) => {
            try {
                setLoading(true);

                let res = await axios.get('/api/Book/BookDetails', { params: { isbn: id } });

                setBook(res.data.item);

            } catch (error) { }
            finally {
                setLoading(false);
            }
        }

        if (id)
            getBook(id);
    }, [])


    let updateBook = (newBook: IBook) => {
        updateBook(newBook)
    }

    let saveBook = async () => {
        try {
            setSaving(true);
        } catch (err) { }
        finally {
            setSaving(false);
        }
    }


    return (
        <Provider
            value={{
                isLoading,
                isSaving,
                book,
                
                updateBook, 
                saveBook
            }}
        >
            {children}
        </Provider>
    )
}

export default BookProvider;