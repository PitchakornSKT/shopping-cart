"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, AppBar, Toolbar, IconButton, Badge, Popover } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 42900, image: '/images/iphone15.webp' },
  { id: 2, name: 'iPhone 15', price: 32900, image: '/images/iphone15.webp' },
  { id: 3, name: 'iPad Pro', price: 32900, image: '/images/ipadpro.webp' },
  { id: 4, name: 'iPad Air', price: 20900, image: '/images/ipadair.webp' },
  { id: 5, name: 'MacBook Pro', price: 73900, image: '/images/macbookpro.jfif' }
];

const Home = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  
  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const incrementQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter(item => item.id !== id);
      }
    });
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static" style={{ backgroundColor: '#000' }}>
        <Toolbar>
          <Typography variant="h6" style={{ color: '#fff', flexGrow: 1 }}>
            Apple Store
          </Typography>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItems.reduce((total, item) => total + item.quantity, 0)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box my={4}>
        <Grid container spacing={4} style={{ marginTop: '20px' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia>
                  <Image src={product.image} alt={product.name} width={300} height={300} layout="responsive" />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {product.price.toLocaleString()} บาท
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => addToCart(product)} 
                    style={{ marginTop: '10px' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Popover สำหรับแสดงรายการในตะกร้า */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box p={2} maxWidth="500px">
          <Typography variant="h6">Your Cart</Typography>
          {cartItems.length === 0 ? (
            <Typography>Your cart is empty</Typography>
          ) : (
            <Box>
              {cartItems.map((item) => (
                <Box key={item.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
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
                      <Button 
                        variant="outlined" 
                        style={{ backgroundColor: '#000', color: '#fff', marginRight: '5px' }} 
                        onClick={() => incrementQuantity(item.id)} 
                      >
                        +
                      </Button>
                      <Button 
                        variant="outlined" 
                        style={{ backgroundColor: '#000', color: '#fff', marginRight: '5px' }} 
                        onClick={() => decrementQuantity(item.id)} 
                      >
                        -
                      </Button>
                    </Box>
                    <Button 
                      variant="outlined" 
                      style={{ backgroundColor: '#000', color: '#fff', marginTop: '10px' }} 
                      onClick={() => removeFromCart(item.id)} 
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
              <Typography variant="h6">Total Price: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()} บาท</Typography>
            </Box>
          )}
        </Box>
      </Popover>

      {/* Footer */}
      <Box mt={4} py={2} textAlign="center" style={{ backgroundColor: '#fff', color: '#000', borderTop: '1px solid #ddd' }}>
        <Typography variant="body2">
          Developer นายพิชชากร สกุลไทย | รหัสนักศึกษา 653450095-6 | 
          Email: <a href="mailto:pitchakorn.sa@kkumail.com" style={{ color: '#000', textDecoration: 'underline' }}>pitchakorn.sa@kkumail.com</a>
        </Typography>
      </Box>

    </Container>
  );
};

export default Home;
