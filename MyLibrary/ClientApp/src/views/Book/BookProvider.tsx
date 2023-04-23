
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
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
    category: string
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
    let { isbn, category, publishDate } = useParams<{ isbn: string, category: string, publishDate: string }>();

    let [isLoading, setLoading] = useState(true);
    let [isSaving, setSaving] = useState(false);

    let [book, setBook] = useState({} as IBook);


    useEffect(() => {
        let getBook = async () => {
            try {
                setLoading(true);

                let res = await axios.get('/api/Books/Book', { params: { isbn, category, publishDate } });

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

        if (isbn && category && publishDate)
            getBook();
    }, [])


    let updateBook = (newBook: IBook) => {
        setBook(newBook)
    }

    let saveBook = async () => {
        try {
            setSaving(true);

            await axios.post('/api/Books/Update', book);

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