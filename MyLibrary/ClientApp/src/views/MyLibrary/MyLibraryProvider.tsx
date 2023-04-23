import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

interface IContext {
    isLoading: boolean
    books: IBook[]
    search: ISearch
    totalItems: number

    updateSearch: (newSearch: ISearch) => void
    doSearch: (values: ISearch) => void
    changePage: (pageNr: number) => void
    updateFavourite: (isbn: string) => Promise<void>
}

interface ISearch {
    category: string
    title: string
}

interface IBook {
    isbn: string
    title: string
    author: string
    publishDate: string
    contributor: string
    image: string
    category: string
    description: string
    isFavourite: boolean
}

export let myLibraryContext = React.createContext({} as IContext);

let { Provider } = myLibraryContext;

let MyLibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let location = useLocation();
    let navigate = useNavigate();

    let [isLoading, setLoading] = useState(true);

    let [books, setBooks] = useState<IBook[]>([]);
    let [totalItems, setTotalItems] = useState(0);

    let [search, setSearch] = useState<ISearch>({
        category: '',
        title: ''
    })


    useEffect(() => {
        if (location.state)
            processState(location.state);

    }, [location.state])


    if (!location.state)
        return <Navigate to={location.pathname} state={{ search: search }} replace={true} />


    let processState = (state: any) => {
        if (state.search) {
            setSearch({
                ...search,
                ...state.search
            });

            searchBooks({
                ...search,
                ...state.search
            });
        }
    }

    let doSearch = (values: ISearch) => {
        let request = {
            ...values,
            // pageNr: values.pageNr > 0 ? 0 : values.pageNr
        }

        navigate(location.pathname, { state: { search: request } });

    }

    let updateSearch = (newSearch: ISearch) => {
        setSearch(newSearch);
    }

    let searchBooks = async (request: ISearch) => {
        try {
            setLoading(true);

            let res = await axios.get('/api/Books/MyLibrary', { params: request });

            let { items, recordCount } = res.data;

            setBooks(items);
            setTotalItems(recordCount);

        } catch (error) { }
        finally {
            setLoading(false);
        }
    }

    let changePage = (page: number) => {
        let request = {
            ...search,
            pageNr: page
        }

        window.scrollTo(0, 0);
        navigate(location.pathname, { state: { search: request } });
    }

    let updateFavourite = async (isbn: string) => {
        try {
            await axios.put(`/api/Books/UpdateFavourite?isbn=${isbn}`);

            let book = books.find(x => x.isbn === isbn) as IBook;
            let bookIdx = books.findIndex(x => x.isbn === isbn);

            let newBook = { ...book, isFavourite: !book?.isFavourite };

            books.splice(bookIdx, 1, newBook);

            setBooks([...books]);

        } catch (err) { }
    }


    return (
        <Provider
            value={{
                isLoading,
                search,
                books,
                totalItems,

                updateSearch,
                doSearch,
                changePage,
                updateFavourite
            }}
        >
            {children}
        </Provider>
    )
}

export default MyLibraryProvider;