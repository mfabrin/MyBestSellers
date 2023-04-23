import BookProvider from './BookProvider';
import Book from './Book';

let Index = () => {
    return (
        <BookProvider>
            <Book />
        </BookProvider>
    )
}

export default Index;