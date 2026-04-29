const findReply = (text) => {
  const content = text.toLowerCase();

  if (content.includes('livraison')) {
    return 'La livraison est disponible partout au Maroc. En general, elle prend entre 24h et 72h selon la ville.';
  }

  if (content.includes('prix') || content.includes('promo')) {
    return 'Tu peux consulter les prix directement dans la page produits. Si tu veux, je peux aussi t aider a choisir selon ton budget.';
  }

  if (content.includes('commande') || content.includes('order')) {
    return 'Pour une commande, ajoute les produits au panier puis valide. L admin verra ensuite la commande dans le dashboard.';
  }

  if (content.includes('bonjour') || content.includes('salut') || content.includes('hello')) {
    return 'Bonjour, bienvenue chez Shop Ma Riad. Je peux t aider pour les produits, la livraison ou les commandes.';
  }

  return 'Merci pour ton message. Je peux t aider sur les produits, les commandes, la livraison ou le contact client.';
};

export const buildChatReply = (message) => ({
  reply: findReply(message || ''),
});
