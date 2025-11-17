        // Sample cart data (you can replace this with real data)
        let cart = [
            {name: "Fresh Apples", price: 5.99, quantity: 2, image: "🍎"},
            {name: "Organic Bread", price: 3.49, quantity: 1, image: "🍞"},
            {name: "Milk", price: 2.99, quantity: 3, image: "🥛"}
        ];

        function openCart() {
            updateCartDisplay();
            document.getElementById('cartModal').style.display = 'flex';
        }

        function closeCart() {
            document.getElementById('cartModal').style.display = 'none';
        }

        function updateCartDisplay() {
            const cartItemsDiv = document.getElementById('cartItems');
            const totalAmountSpan = document.getElementById('totalAmount');
            
            if (cart.length > 0) {
                let html = '';
                let total = 0;
                
                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    html += `
                        <div class="cart-item">
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                                <div class="item-quantity">Qty: ${item.quantity}</div>
                                <div class="item-price">$${itemTotal.toFixed(2)}</div>
                            </div>
                            <div class="item-actions">
                                <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                            </div>
                        </div>
                    `;
                });
                
                cartItemsDiv.innerHTML = html;
                totalAmountSpan.textContent = total.toFixed(2);
            } else {
                cartItemsDiv.innerHTML = `
                    <div class="empty-cart">
                        <i>🛒</i>
                        <p>Your cart is empty</p>
                    </div>
                `;
                totalAmountSpan.textContent = '0.00';
            }
        }

        function removeItem(index) {
            cart.splice(index, 1);
            updateCartDisplay();
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Proceeding to checkout!');
            // Add your checkout logic here
            closeCart();
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('cartModal');
            if (event.target === modal) {
                closeCart();
            }
        }

        // Close modal with ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const modal = document.getElementById('cartModal');
                if (modal.style.display === 'flex') {
                    closeCart();
                }
            }
        });