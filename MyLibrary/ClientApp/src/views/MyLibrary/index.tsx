import MyLibraryProvider from './MyLibraryProvider';
import MyLibrary from './MyLibrary';

let Index = () => {
    return (
        <MyLibraryProvider>
            <MyLibrary />
        </MyLibraryProvider>
    )
}

export default Index;