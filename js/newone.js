// Global cart
let cart = [];

// Helper function for receipt formatting
function formatValue(val) {
    if (!val || val === 'none') return 'None';
    if (val === '2%') return '2% Milk';
    return val.charAt(0).toUpperCase() + val.slice(1);
}

function openSidebar(id, imgSrc, title, desc, price) {
    document.getElementById('sidebar-img').src = imgSrc;
    document.getElementById('sidebar-title').textContent = title;
    document.getElementById('sidebar-desc').textContent = desc;
    document.getElementById('sidebar-price').textContent = price;
    document.getElementById('customization-sidebar').dataset.itemId = id;
    document.getElementById('customization-sidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeSidebar() {
    document.getElementById('customization-sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function addToCart() {
    const itemId = document.getElementById('customization-sidebar').dataset.itemId;
    const size = document.getElementById('size-option').value;
    const milk = document.getElementById('milk-option').value;
    const sweetener = document.getElementById('sweetener-option').value;
    const temp = document.getElementById('temp-option').value;
    
    const itemName = document.getElementById('sidebar-title').textContent;
    const itemPrice = parseFloat(document.getElementById('sidebar-price').textContent.replace('$', ''));
    const itemImage = document.getElementById('sidebar-img').src;
    
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
    
    const existingItemIndex = cart.findIndex(item => 
        item.id === itemId && 
        item.customizations.size === size &&
        item.customizations.milk === milk &&
        item.customizations.sweetener === sweetener &&
        item.customizations.temperature === temp
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(newCartItem);
    }
    
    closeSidebar();
    updateCartDisplay();
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
                        <button class="remove-item" onclick="modifieritem(${index})">Modifier</button>
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
        alert("Your cart is empty!");
        return;
    }

    let printContent = `
        <html>
        <head>
            <title>Order Receipt</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    color: black;
                }
                h2 {
                    text-align: center;
                    color: #2c3e50;
                }
                .item {
                    margin-bottom: 15px;
                    padding: 10px;
                    border: 1px solid #eee;
                    border-radius: 6px;
                    background: #f9f9f9;
                }
                .total {
                    text-align: right;
                    font-size: 20px;
                    font-weight: bold;
                    margin-top: 20px;
                    color: black;
                    border-top: 2px solid #000;
                    padding-top: 10px;
                }
                hr {
                    margin: 15px 0;
                }
            </style>
        </head>
        <body>
            <h2>Order Summary</h2>
            <hr>
    `;

    cart.forEach(item => {
        printContent += `
            <div class="item">
                <h3>${item.name}</h3>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Size:</strong> ${formatValue(item.customizations.size)}</p>
                <p><strong>Milk:</strong> ${formatValue(item.customizations.milk)}</p>
                <p><strong>Sweetener:</strong> ${formatValue(item.customizations.sweetener)}</p>
                <p><strong>Temperature:</strong> ${formatValue(item.customizations.temperature)}</p>
                <p><strong>Price:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    printContent += `
            <div class="total">Total: $${total.toFixed(2)}</div>
        </body>
        </html>
    `;

    const printWin = window.open('', '_blank');
    printWin.document.open();
    printWin.document.write(printContent);
    printWin.document.close();

    printWin.onload = () => {
        printWin.focus();
        printWin.print();
    };
}

// Close cart modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const cartModal = document.getElementById('cartModal');
        if (cartModal.style.display === 'flex') {
            closeCart();
        } else {
            closeModification();
            closeSidebar();
        }
    }
});

// === MODIFICATION MODAL FUNCTIONS ===

function closeModification() {
    const modal = document.querySelector('.modification-modal');
    const overlay = document.querySelector('.modification-overlay');
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}

function modifieritem(index) {
    // Ensure index is valid
    if (index < 0 || index >= cart.length) return;

    // Close any existing modal
    closeModification();

    const item = cart[index];
    
    const modificationHTML = `
        <div style="padding: 15px; font-family: Arial, sans-serif;">
            <h3 style="margin-top: 0; color: #333;">Modifier: ${item.name}</h3>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; color: #333; margin-bottom: 5px;">Quantity:</label>
                <input type="number" id="newQuantity" value="${item.quantity}" min="1" style="width: 80px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; color: #333; margin-bottom: 5px;">Size:</label>
                <select id="newSize" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="small" ${item.customizations.size === 'small' ? 'selected' : ''}>Small</option>
                    <option value="regular" ${item.customizations.size === 'regular' ? 'selected' : ''}>Regular</option>
                    <option value="large" ${item.customizations.size === 'large' ? 'selected' : ''}>Large</option>
                </select>
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; color: #333; margin-bottom: 5px;">Milk:</label>
                <select id="newMilk" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="none" ${item.customizations.milk === 'none' ? 'selected' : ''}>No Milk</option>
                    <option value="whole" ${item.customizations.milk === 'whole' ? 'selected' : ''}>Whole Milk</option>
                    <option value="2%" ${item.customizations.milk === '2%' ? 'selected' : ''}>2% Milk</option>
                    <option value="oat" ${item.customizations.milk === 'oat' ? 'selected' : ''}>Oat Milk</option>
                    <option value="almond" ${item.customizations.milk === 'almond' ? 'selected' : ''}>Almond Milk</option>
                </select>
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; color: #333; margin-bottom: 5px;">Sweetener:</label>
                <select id="newSweetener" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="none" ${item.customizations.sweetener === 'none' ? 'selected' : ''}>No Sweetener</option>
                    <option value="sugar" ${item.customizations.sweetener === 'sugar' ? 'selected' : ''}>Sugar</option>
                    <option value="artificial" ${item.customizations.sweetener === 'artificial' ? 'selected' : ''}>Artificial Sweetener</option>
                    <option value="honey" ${item.customizations.sweetener === 'honey' ? 'selected' : ''}>Honey</option>
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; color: #333; margin-bottom: 5px;">Temperature:</label>
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
    
    const modal = document.createElement('div');
    modal.className = 'modification-modal';
    modal.innerHTML = modificationHTML;
    Object.assign(modal.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '0',
        border: '2px solid #333',
        borderRadius: '10px',
        zIndex: '3000',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        maxWidth: '400px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
    });
    
    const overlay = document.createElement('div');
    overlay.className = 'modification-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.6)',
        zIndex: '2999'
    });
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

function saveModification(index) {
    // Safety check
    if (index < 0 || index >= cart.length) {
        alert('Item no longer exists.');
        closeModification();
        return;
    }

    const newQuantityInput = document.getElementById('newQuantity');
    const newSizeSelect = document.getElementById('newSize');
    const newMilkSelect = document.getElementById('newMilk');
    const newSweetenerSelect = document.getElementById('newSweetener');
    const newTempSelect = document.getElementById('newTemp');

    // If any element is missing (shouldn't happen with our cleanup), handle gracefully
    if (!newQuantityInput || !newSizeSelect || !newMilkSelect || !newSweetenerSelect || !newTempSelect) {
        alert('Error: Modification form not found.');
        closeModification();
        return;
    }

    const newQuantity = parseInt(newQuantityInput.value, 10);
    const newSize = newSizeSelect.value;
    const newMilk = newMilkSelect.value;
    const newSweetener = newSweetenerSelect.value;
    const newTemp = newTempSelect.value;
    
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