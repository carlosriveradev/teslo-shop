import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';

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
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline="always">
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
]

const rows = [
    {id: 1, paid: false, fullname: 'Carlos Rivera'},
    {id: 2, paid: true, fullname: 'Carmen Isidro'},
    {id: 3, paid: false, fullname: 'Paola Rivera'},
    {id: 4, paid: true, fullname: 'Juan Mendoza'},
    {id: 5, paid: false, fullname: 'Alys Mendoza'},
    {id: 6, paid: true, fullname: 'Luz Mendoza'},
]


const HistoryPage = () => {
    return (
        <ShopLayout title="Historia de ordenes" pageDescription="Historial de ordenes del cliente">
            <Typography variant="h1" component="h1">Historial de ordenes</Typography>

            <Grid container>
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

export default HistoryPage