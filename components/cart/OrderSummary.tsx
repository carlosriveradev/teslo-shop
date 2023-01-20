import { Grid, Typography } from "@mui/material"
import { FC, useContext } from "react"
import { CartContext } from "../../context"
import { IOrder } from "../../interfaces"
import { currency } from "../../utils"

interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number;
    }
}

export const OrderSummary:FC<Props> = ({orderValues}) => {

    // console.log(orderValues);
    
    const dataContext = useContext(CartContext)

    const summaryValues = orderValues ? orderValues : dataContext
    
    const { numberOfItems, subTotal, total, tax } = summaryValues

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ currency.format(subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100}%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{mt:2}}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
                <Typography variant="subtitle1">{currency.format(total)}</Typography>
            </Grid>
        </Grid>
    )
}
