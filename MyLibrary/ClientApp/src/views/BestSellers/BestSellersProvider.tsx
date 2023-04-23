import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

interface IContext {
    isLoading: boolean
    books: IBook[]
    search: ISearch
    categories: string[]

    updateSearch: (newSearch: ISearch) => void
    doSearch: (values: ISearch) => void
    changePage: (pageNr: number) => void
    updateLibrary: (book: IBook) => Promise<void>
}

interface ISearch {
    publishDate: string
    category: string
}

interface IBook {
    isbn: string
    title: string
    publishDate: string
    author: string
    contributor: string
    image: string
    category: string
    description: string
    isFavourite: boolean
}

export let bestSellersContext = React.createContext({} as IContext);

let { Provider } = bestSellersContext;

let BestSellersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let location = useLocation();
    let navigate = useNavigate();

    let [isLoading, setLoading] = useState(true);

    let [books, setBooks] = useState<IBook[]>([]);

    let [categories, setCategories] = useState<string[]>([]);
    let [search, setSearch] = useState<ISearch>({
        publishDate: '2023-04-01',
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

            searchBestSellers({
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

    let searchBestSellers = async (request: ISearch) => {
        try {
            setLoading(true);

            let res = await axios.get('/api/Books/BestSellers', { params: request });

            let { item } = res.data;

            setCategories(item.categories)
            setBooks(item.books);

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

    let updateLibrary = async (req: IBook) => {
        try {
            let request = {
                isbn: req.isbn,
                category: req.category,
                publishDate: req.publishDate
            };

            await axios.post('/api/Books/UpdateLibrary', request);

            let book = books.find(x => x.isbn === req.isbn && x.category === req.category) as IBook;
            let bookIdx = books.findIndex(x => x.isbn === req.isbn && x.category === req.category);

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
                categories,

                updateSearch,
                doSearch,
                changePage,
                updateLibrary
            }}
        >
            {children}
        </Provider>
    )
}

export default BestSellersProvider;