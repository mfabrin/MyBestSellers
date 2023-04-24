import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

interface IContext {
    isLoading: boolean
    books: IBook[]
    search: ISearch

    updateSearch: (newSearch: ISearch) => void
    doSearch: (values: ISearch) => void
}

interface ISearch {
    category: string
    title: string
    author: string
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

    let [search, setSearch] = useState<ISearch>({
        category: '',
        title: '',
        author: ''
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
        navigate(location.pathname, { state: { search: values } });
    }

    let updateSearch = (newSearch: ISearch) => {
        setSearch(newSearch);
    }

    let searchBooks = async (request: ISearch) => {
        try {
            setLoading(true);

            let res = await axios.get('/api/Books/MyLibrary', { params: request });

            let { items } = res.data;

            setBooks(items);

        } catch (error) { }
        finally {
            setLoading(false);
        }
    }


    return (
        <Provider
            value={{
                isLoading,
                search,
                books,

                updateSearch,
                doSearch
            }}
        >
            {children}
        </Provider>
    )
}

export default MyLibraryProvider;