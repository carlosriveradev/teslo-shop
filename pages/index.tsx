import { NextPage } from "next"
import { Typography } from "@mui/material"

import { ShopLayout } from "../components/layouts"
import { initialData } from '../database/products';
import { ProductList } from "../components/products"


const HomePage: NextPage = () => {
    return (
        <ShopLayout title={ 'Teslo-Shop - Home' } pageDescription={ 'Los mejores productos' }>
            <Typography variant="h1" component="h1">Tienda</Typography>
            <Typography variant="h2">Todos los productos</Typography>

            {/* TODO: Remover el tipo de dato any al tener la BD */}
            <ProductList
                products={initialData.products as any}
            />
        
        </ShopLayout>
    )
}

export default HomePage
