import { FC } from "react"
import { Box, IconButton, Typography } from "@mui/material"
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"

interface Props {
    currentValue: number;
    maxValue: number;
    // methods
    updateQuantity: (quantity:number) => void;
}

export const ItemCounter: FC<Props> = ({currentValue, updateQuantity, maxValue}) => {

    const onIncrement = () => {
        const new_value = currentValue + 1
        if(new_value > maxValue) return;
        return updateQuantity(new_value)
        
    }
    const onDecrement = () => {
        const new_value = currentValue - 1
        if(new_value === 0) return;
        return updateQuantity(new_value)
    }

    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={onDecrement}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center'}}>{currentValue}</Typography>
            <IconButton onClick={onIncrement}>
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
