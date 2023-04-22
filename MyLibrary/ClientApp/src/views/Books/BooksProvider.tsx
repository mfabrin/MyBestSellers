import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { applicationContext } from 'helpers/services';

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
    isbn: string
    category: string
    pageNr: number
    pageSize: number
}

interface IBook {
    isbn: string
    title: string
    author: string
    contributor: string
    image: string
    category: string
    description: string
}

export let booksContext = React.createContext({} as IContext);

let { Provider } = booksContext;

let BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let location = useLocation();
    let navigate = useNavigate();

    let { bookCategories } = useContext(applicationContext);

    let [isLoading, setLoading] = useState(true);

    let [books, setBooks] = useState<IBook[]>([]);
    let [totalItems, setTotalItems] = useState(0);

    let [search, setSearch] = useState<ISearch>({
        isbn: '',
        category: bookCategories[0].key,
        pageNr: 0,
        pageSize: 20
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
            pageNr: values.pageNr > 0 ? 0 : values.pageNr
        }

        navigate(location.pathname, { state: { search: request } });

    }

    let updateSearch = (newSearch: ISearch) => {
        setSearch(newSearch);
    }

    let searchBooks = async (request: ISearch) => {
        try {
            setLoading(true);

            let res = await axios.get('/api/Books/BookList', { params: search });

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

export default BooksProvider;