import styled from 'styled-components';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <ItemContainer>
      <img src={item.image} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <p>{item.price.toLocaleString()} บาท</p>
        <QuantityControl>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </QuantityControl>
        <TotalPrice>{(item.price * item.quantity).toLocaleString()} บาท</TotalPrice>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </ItemContainer>
  );
};

export default CartItem;

const ItemContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  div {
    margin-left: 20px;
    h4 {
      margin: 0;
    }
  }
  button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  button {
    background-color: #ddd;
    border: none;
    padding: 5px;
  }
  span {
    margin: 0 10px;
  }
`;

const TotalPrice = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;
