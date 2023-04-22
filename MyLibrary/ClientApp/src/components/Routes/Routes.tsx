import { Navigate, Route, Routes as Router } from 'react-router-dom';
import { PublicRoute } from 'components';

import {
    Error403,
    Error404,
    Books,
    Book
} from 'views';

// import { Login } from 'views/Account';

let Routes = () => {
    return (
        <Router>
            <Route path="/books" element={<PublicRoute children={<Books />} />} />
            <Route path="/book/:category/:pageNr/:isbn" element={<PublicRoute children={<Book />} />} />

            {/* <Route path="/account/login" element={<PublicRoute children={<Login />} />} /> */}

            <Route path="/error403" element={<PublicRoute children={<Error403 />} />} />
            <Route path="/error404" element={<PublicRoute children={<Error404 />} />} />

            <Route path="*" element={<Navigate to={"/books"} />} />
        </Router>
    )
}

export default Routes;