import { NextPage, GetServerSideProps } from "next"
import { Box, Typography } from "@mui/material"

import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { dbProducts } from "../../database"
import { IProduct } from "../../interfaces"


interface Props {
    products: IProduct[];
    foundProducts: boolean,
    query: string
}

const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {

    return (
        <ShopLayout title={ 'Teslo-Shop - Home' } pageDescription={ 'Los mejores productos' }>
            <Typography variant="h1" component="h1">Buscar producto</Typography>
            {
                foundProducts
                    ? <Typography variant="h2" sx={{mb:1}} textTransform="capitalize">Término: {query}</Typography>
                    : (
                        <Box display='flex'>
                            <Typography variant="h2" sx={{mb:1}}>No encontramos productos</Typography>
                            <Typography variant="h2" sx={{ml:1}} color="secondary" textTransform="capitalize">{query}</Typography>
                        </Box>
                    )
            }
            
            

            <ProductList products={products} />
            
        </ShopLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const {query=''} = params as {query: string}
    
    let products = await  dbProducts.gerProductsByTerm(query)
    const foundProducts = products.length > 0

    if (!foundProducts) {
        products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


export default SearchPage
