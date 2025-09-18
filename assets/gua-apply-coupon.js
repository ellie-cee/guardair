document.addEventListener('DOMContentLoaded', function() {
  const couponForm = document.querySelector('.cart__coupon-form');
  if (couponForm) {
    couponForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const couponCode = formData.get('discount');
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Applying...';
      
      // Add coupon code to cart attributes
      const body = JSON.stringify({
        attributes: {
          'coupon_code': couponCode
        }
      });
      
      fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
      })
      .then(response => response.json())
      .then(data => {
        // Apply the discount code
        window.location.href = `/discount/${encodeURIComponent(couponCode)}`;
      })
      .catch(error => {
        console.error('Error applying coupon:', error);
        
        // Re-enable button and show error
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show error message (you can customize this)
        showCouponError('Unable to apply coupon code. Please try again.');
      });
    });
  }
});

function showCouponError(message) {
  // Remove existing error messages
  const existingError = document.querySelector('.cart__coupon-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Create and show new error message
  const couponForm = document.querySelector('.cart__coupon-form');
  if (couponForm) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'cart__coupon-error';
    errorDiv.innerHTML = `<p class="form__message">${message}</p>`;
    couponForm.appendChild(errorDiv);
    
    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
}