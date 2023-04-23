
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack';

interface IContext {
    isLoading: boolean
    isSaving: boolean
    book: IBook

    updateBook: (newBook: IBook) => void
    saveBook: () => Promise<void>
}

interface IBook {
    isbn: string
    image: string
    title: string
    author: string
    contributor: string
    description: string
    notes: string
    rank: number
    isFavourite: boolean
    isRead: boolean
}

export let bookContext = React.createContext({} as IContext);

let { Provider } = bookContext;

let BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let { isbn, pageNr, category } = useParams<{ isbn: string, pageNr: string, category: string }>();

    let [isLoading, setLoading] = useState(true);
    let [isSaving, setSaving] = useState(false);

    let [book, setBook] = useState({} as IBook);


    useEffect(() => {
        let getBook = async () => {
            try {
                setLoading(true);

                let res = await axios.get('/api/Books/BookDetails', { params: { isbn, pageNr, category } });

                let { item } = res.data;

                setBook({
                    ...item,
                    notes: item.notes ?? ''
                });

            } catch (error) { }
            finally {
                setLoading(false);
            }
        }

        if (isbn && pageNr && category)
            getBook();
    }, [])


    let updateBook = (newBook: IBook) => {
        setBook(newBook)
    }

    let saveBook = async () => {
        try {
            setSaving(true);

            await axios.post('/api/Books/Save', book);

            enqueueSnackbar("Book saved", { variant: "success" })

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