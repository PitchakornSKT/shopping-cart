import React from 'react';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';

const CartItem = ({ item, incrementQuantity, decrementQuantity, removeFromCart }) => {
  return (
    <Box style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <Image src={item.image} alt={item.name} width={50} height={50} style={{ marginRight: '10px' }} />
      <Box style={{ flexGrow: 1 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography>
          {item.price.toLocaleString()} บาท x {item.quantity}
        </Typography>
        <Typography>Total: {(item.price * item.quantity).toLocaleString()} บาท</Typography>
      </Box>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box>
          <Button variant="outlined" style={{ backgroundColor: '#000', color: '#fff', marginRight: '5px' }} onClick={() => incrementQuantity(item.id)}>+</Button>
          <Button variant="outlined" style={{ backgroundColor: '#000', color: '#fff', marginRight: '5px' }} onClick={() => decrementQuantity(item.id)}>-</Button>
        </Box>
        <Button variant="outlined" style={{ backgroundColor: '#000', color: '#fff', marginTop: '10px' }} onClick={() => removeFromCart(item.id)}>Remove</Button>
      </Box>
    </Box>
  );
};

export default CartItem;
