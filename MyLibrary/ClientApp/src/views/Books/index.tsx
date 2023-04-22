import BooksProvider from './BooksProvider';
import Books from './Books';

let Index = () => {
    return (
        <BooksProvider>
            <Books />
        </BooksProvider>
    )
}

export default Index;