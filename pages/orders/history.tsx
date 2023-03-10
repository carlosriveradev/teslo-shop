import { NextPage, GetServerSideProps } from "next";
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from "@mui/material"
import { getSession } from "next-auth/react";
import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { ShopLayout } from "../../components/layouts"
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullname', headerName: 'Nombre completo', width: 300},
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagara la orden o no',
        width: 200,
        renderCell: (params) => {
            return (
                params.row.paid
                ? <Chip color="success" label="Pagada" variant="outlined" />
                : <Chip color="error" label="No agada" variant="outlined" />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        description: 'Muestra información si está pagara la orden o no',
        width: 200,
        sortable: false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline="always">
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
]

// const rows = [
//     {id: 1, paid: false, fullname: 'Carlos Rivera'},
//     {id: 2, paid: true, fullname: 'Carmen Isidro'},
//     {id: 3, paid: false, fullname: 'Paola Rivera'},
//     {id: 4, paid: true, fullname: 'Juan Mendoza'},
//     {id: 5, paid: false, fullname: 'Alys Mendoza'},
//     {id: 6, paid: true, fullname: 'Luz Mendoza'},
// ]


interface Props {
    orders: IOrder[]
}

const HistoryPage:NextPage<Props> = ({orders}) => {
    
    // console.log(orders);
    const rows = orders.map((order, index) => ({
        id: index+1, 
        paid: order.isPaid,
        fullname: order.shippingAddress.firstName+' '+order.shippingAddress.lastName,
        orderId: order._id
    }))
    

    return (
        <ShopLayout title="Historia de ordenes" pageDescription="Historial de ordenes del cliente">
            <Typography variant="h1" component="h1">Historial de ordenes</Typography>

            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    
    const session: any = await getSession({req})
    if(!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id)


    return {
        props: {
            orders
        }
    }
}


export default HistoryPage