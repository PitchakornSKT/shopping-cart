import styled from 'styled-components';

const CartSummary = ({ items }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <SummaryContainer>
      <h3>Total</h3>
      <p>{total.toLocaleString()} บาท</p>
    </SummaryContainer>
  );
};

export default CartSummary;

const SummaryContainer = styled.div`
  margin-top: 20px;
  border-top: 2px solid #ddd;
  padding-top: 10px;
  h3 {
    margin: 0;
  }
  p {
    font-size: 18px;
    font-weight: bold;
  }
`;
