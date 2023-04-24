import MyBestSellersProvider from './MyBestSellersProvider';
import MyBestSellers from './MyBestSellers';

let Index = () => {
    return (
        <MyBestSellersProvider>
            <MyBestSellers />
        </MyBestSellersProvider>
    )
}

export default Index;