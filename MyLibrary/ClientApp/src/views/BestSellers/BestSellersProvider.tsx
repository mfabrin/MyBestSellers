import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

interface IContext {
    isLoading: boolean
    search: ISearch
    categories: string[]
    bestSellers: ICategory[]

    updateSearch: (newSearch: ISearch) => void
    searchBestSellers: (values: ISearch) => Promise<void>
}

interface ISearch {
    publishDate: dayjs.Dayjs
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
        publishDate: dayjs().startOf('month'),
        category: ''
    })

    useEffect(() => {
        searchBestSellers(search)
    }, [search])

    let updateSearch = (newSearch: ISearch) => {
        setSearch(newSearch);
    }

    let searchBestSellers = async (newSearch: ISearch) => {
        try {
            setLoading(true);

            let res = await axios.get('/api/Books/BestSellers', { params: newSearch });

            let { item } = res.data;

            setCategories(item.categories)
            setBestSellers(item.bestSellers)

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
                categories,
                bestSellers,

                updateSearch,
                searchBestSellers
            }}
        >
            {children}
        </Provider>
    )
}

export default BestSellersProvider;