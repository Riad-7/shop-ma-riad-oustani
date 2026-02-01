// src/utils/formatPrice.js
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
  }).format(price);
};