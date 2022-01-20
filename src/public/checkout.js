alert('hello')
const stripe = Stripe('pk_test_51KJdkBSBAERtxvq0Nvh7E5lEQaOjWOgBmFBIcnu723EyQgXx7lngesM9Au2VBILH5Kl26wqOOw5dJgTIppqjGh1S00lXSEhdXV');
(async () => {
    const response = await fetch('payment/pay');
    const client_secret = await response.json();
    const options = {
        clientSecret: client_secret,
        // Fully customizable with appearance API.
        appearance: {/*...*/},
      };
      
      // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
      const elements = stripe.elements(options);
      
      // Create and mount the Payment Element
      const paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');
  })();
