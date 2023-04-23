import BestSellersProvider from './BestSellersProvider';
import BestSellers from './BestSellers';

let Index = () => {
    return (
        <BestSellersProvider>
            <BestSellers />
        </BestSellersProvider>
    )
}

export default Index;