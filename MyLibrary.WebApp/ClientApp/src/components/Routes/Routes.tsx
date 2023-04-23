import { Navigate, Route, Routes as Router } from 'react-router-dom';
import { Layout } from 'components';

import {
    BestSellers,
    MyLibrary,
    Book
} from 'views';

let Routes = () => {
    return (
        <Router>
            <Route path="/bestsellers" element={<Layout children={<BestSellers />} />} />
            <Route path="/book/:isbn/:category/:publishDate" element={<Layout children={<Book />} />} />
            
            <Route path="/mylibrary" element={<Layout children={<MyLibrary />} />} />

            <Route path="*" element={<Navigate to={"/bestsellers"} />} />
        </Router>
    )
}

export default Routes;