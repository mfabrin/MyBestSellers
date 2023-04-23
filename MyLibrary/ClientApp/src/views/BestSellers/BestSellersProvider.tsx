import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

interface IContext {
    isLoading: boolean
    search: ISearch
    categories: string[]
    bestSellers: ICategory[]

    updateSearch: (newSearch: ISearch) => void
    doSearch: (values: ISearch) => void
    changePage: (pageNr: number) => void
}

interface ISearch {
    publishDate: string
    category: string
}

interface ICategory {
    category: string
    publishDate: string
    books: IBook[]
}

interface IBook {
    isbn: string
    title: string
    publishDate: string
    author: string
    image: string
    category: string
}

export let bestSellersContext = React.createContext({} as IContext);

let { Provider } = bestSellersContext;

let BestSellersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let location = useLocation();
    let navigate = useNavigate();

    let [isLoading, setLoading] = useState(true);

    let [categories, setCategories] = useState<string[]>([]);
    let [bestSellers, setBestSellers] = useState<ICategory[]>([]);

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
            setBestSellers(item.bestSellers)

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
                categories, 
                bestSellers,

                updateSearch,
                doSearch,
                changePage,
            }}
        >
            {children}
        </Provider>
    )
}

export default BestSellersProvider;