var handler = StripeCheckout.configure({
  key: 'pk_test_4TvVtXNxfrCpM0fUy9bKpxg6',
  image: '../img/ccssIco.png',
  token: function(token) {
    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
  }
});

document.getElementById('customButton').addEventListener('click', function(e) {
  // Open Checkout with further options
  handler.open({
    name: 'CCSS',
    description: 'NotFrosh ($20.00)',
    amount: 2000
  });
  e.preventDefault();
});