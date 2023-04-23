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
}

interface ISearch {
    category: string
}

interface IBook {
    isbn: string
    title: string
    author: string
    publishDate: string
    image: string
    category: string
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
        category: ''
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


    return (
        <Provider
            value={{
                isLoading,
                search,
                books,
                totalItems,

                updateSearch,
                doSearch,
                changePage
            }}
        >
            {children}
        </Provider>
    )
}

export default MyLibraryProvider;