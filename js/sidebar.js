 function openSidebar(id, imgSrc, title, desc, price) {
            document.getElementById('sidebar-img').src = imgSrc;
            
            document.getElementById('sidebar-title').textContent = title;
            document.getElementById('sidebar-desc').textContent = desc;
            document.getElementById('sidebar-price').textContent = price;
            
            // Store the item ID for later use
            document.getElementById('customization-sidebar').dataset.itemId = id;
            
            // Show sidebar and overlay
            document.getElementById('customization-sidebar').classList.add('active');
            document.getElementById('overlay').classList.add('active');
        }
        
        function closeSidebar() {
            document.getElementById('customization-sidebar').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        }
        
        // function addToCart() {
        //     let cart = [];
        //     const itemId = document.getElementById('customization-sidebar').dataset.itemId;
        //     const size = document.getElementById('size-option').value;
        //     const milk = document.getElementById('milk-option').value;
        //     const sweetener = document.getElementById('sweetener-option').value;
        //     const temp = document.getElementById('temp-option').value;
            
        //     // Example of collecting customization options
        //     cart.push({
        //         name: itemId,
        //         price: 3.50,
        //         quantity: 1,
        //         image: "☕"
        //     });
            
        //     // Close sidebar after adding to cart
        //     closeSidebar();
            
        //     // Here you would typically add the item to your cart system
        //     alert(`Added to cart! Customizations saved.`);
        // }
        
        // // Close sidebar when clicking outside (ESC key)
        // document.addEventListener('keydown', function(event) {
        //     if (event.key === 'Escape') {
        //         closeSidebar();
        //     }
        // });

        // // Sample cart data (you can replace this with real data)
        
        // addToCart();
        // Declare cart as a global variable
let cart = [];

function addToCart() {
    const itemId = document.getElementById('customization-sidebar').dataset.itemId;
    const size = document.getElementById('size-option').value;
    const milk = document.getElementById('milk-option').value;
    const sweetener = document.getElementById('sweetener-option').value;
    const temp = document.getElementById('temp-option').value;
    
    // Get item details from the sidebar
    const itemName = document.getElementById('sidebar-title').textContent;
    const itemPrice = parseFloat(document.getElementById('sidebar-price').textContent.replace('$', ''));
    const itemImage = document.getElementById('sidebar-img').src;
    
    // Create new cart item object with customizations
    const newCartItem = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: 1,
        image: itemImage,
        customizations: {
            size: size,
            milk: milk,
            sweetener: sweetener,
            temperature: temp
        }
    };
    
    // Check if item already exists in cart with same customizations
    const existingItemIndex = cart.findIndex(item => 
        item.id === itemId && 
        item.customizations.size === size &&
        item.customizations.milk === milk &&
        item.customizations.sweetener === sweetener &&
        item.customizations.temperature === temp
    );
    
    if (existingItemIndex > -1) {
        // If item exists with same customizations, increment quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Otherwise add new item to cart
        cart.push(newCartItem);
    }
    
    console.log('Added to cart:', newCartItem);
    console.log('Current cart:', cart);
    
    // Close sidebar after adding to cart
    closeSidebar();
    
    // Update cart display
    updateCartDisplay();
    
    // Show confirmation
    alert(`Added to cart! ${itemName} with customizations saved.`);
}

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
                        <div class="item-quantity">Qty: ${item.quantity}</div>
                        <details>
                          <summary><div class="item-name">${item.name}</div></summary>
                          <p class="name-li"><strong>Order Summary:</strong></p>
                          <ul class="name-ul">
                            <li class="name-li">Size: ${item.customizations.size}</li>
                            <li class="name-li">Milk: ${item.customizations.milk}</li>
                            <li class="name-li">Sweetener: ${item.customizations.sweetener}</li>
                            <li class="name-li">Temperature: ${item.customizations.temperature}</li>
                            <li class="name-li">Price: $${itemTotal.toFixed(2)}</li>
                          </ul>
                        </details>
                    </div>
                    
                    <div class="item-actions">
                        <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                    </div>
                    <div class="item-actions">
                        <button class="remove-item" onclick="modifieritem(${index})">modifier</button>
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

    function modifieritem(index) {
    const item = cart[index];
    
    // Create HTML for modification form
    const modificationHTML = `
        <div style="padding: 15px; font-family: Arial, sans-serif;">
            <h3 style="margin-top: 0; color: #333;">Modifier: ${item.name}</h3>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block;color: #333; margin-bottom: 5px;">Quantity:</label>
                <input type="number" id="newQuantity" value="${item.quantity}" min="1" style="width: 80px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block;color: #333; margin-bottom: 5px;">Size:</label>
                <select id="newSize" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="small" ${item.customizations.size === 'small' ? 'selected' : ''}>Small</option>
                    <option value="regular" ${item.customizations.size === 'regular' ? 'selected' : ''}>Regular</option>
                    <option value="large" ${item.customizations.size === 'large' ? 'selected' : ''}>Large</option>
                </select>
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block;color: #333; margin-bottom: 5px;">Milk:</label>
                <select id="newMilk" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="none" ${item.customizations.milk === 'none' ? 'selected' : ''}>No Milk</option>
                    <option value="whole" ${item.customizations.milk === 'whole' ? 'selected' : ''}>Whole Milk</option>
                    <option value="2%" ${item.customizations.milk === '2%' ? 'selected' : ''}>2% Milk</option>
                    <option value="oat" ${item.customizations.milk === 'oat' ? 'selected' : ''}>Oat Milk</option>
                    <option value="almond" ${item.customizations.milk === 'almond' ? 'selected' : ''}>Almond Milk</option>
                </select>
            </div>
            
            <div style="margin-bottom: 10px;">
                <label  style="display: block;color: #333; margin-bottom: 5px;">Sweetener:</label>
                <select id="newSweetener" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="none" ${item.customizations.sweetener === 'none' ? 'selected' : ''}>No Sweetener</option>
                    <option value="sugar" ${item.customizations.sweetener === 'sugar' ? 'selected' : ''}>Sugar</option>
                    <option value="artificial" ${item.customizations.sweetener === 'artificial' ? 'selected' : ''}>Artificial Sweetener</option>
                    <option value="honey" ${item.customizations.sweetener === 'honey' ? 'selected' : ''}>Honey</option>
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block;color: #333; margin-bottom: 5px;">Temperature:</label>
                <select id="newTemp" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="hot" ${item.customizations.temperature === 'hot' ? 'selected' : ''}>Hot</option>
                    <option value="warm" ${item.customizations.temperature === 'warm' ? 'selected' : ''}>Warm</option>
                    <option value="iced" ${item.customizations.temperature === 'iced' ? 'selected' : ''}>Iced</option>
                </select>
            </div>
            
            <div style="text-align: center;">
                <button onclick="saveModification(${index})" style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin-right: 10px; cursor: pointer;">Save</button>
                <button onclick="closeModification()" style="background: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
            </div>
        </div>
    `;
    
    // Create a modal for modification
    const modal = document.createElement('div');
    modal.innerHTML = modificationHTML;
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'white';
    modal.style.padding = '0';
    modal.style.border = '2px solid #333';
    modal.style.borderRadius = '10px';
    modal.style.zIndex = '3000';
    modal.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    modal.style.maxWidth = '400px';
    modal.style.width = '90%';
    modal.style.maxHeight = '90vh';
    modal.style.overflowY = 'auto';
    
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.zIndex = '2999';
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

function saveModification(index) {
    const newQuantity = parseInt(document.getElementById('newQuantity').value);
    const newSize = document.getElementById('newSize').value;
    const newMilk = document.getElementById('newMilk').value;
    const newSweetener = document.getElementById('newSweetener').value;
    const newTemp = document.getElementById('newTemp').value;
    
    if (!isNaN(newQuantity) && newQuantity > 0) {
        cart[index].quantity = newQuantity;
        cart[index].customizations.size = newSize;
        cart[index].customizations.milk = newMilk;
        cart[index].customizations.sweetener = newSweetener;
        cart[index].customizations.temperature = newTemp;
        
        updateCartDisplay();
        closeModification();
        alert('Item updated successfully!');
    } else {
        alert('Please enter a valid quantity');
    }
}

function closeModification() {
    // Remove the modal and overlay
    const existingModals = document.querySelectorAll('div[style*="position: fixed"]');
    existingModals.forEach(modal => {
        if (modal.style.zIndex === '3000' || modal.style.zIndex === '2999') {
            modal.remove();
        }
    });
}