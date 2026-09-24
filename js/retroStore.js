/**
 * The Retro Rack - Interactive Live Demo Data & State Store
 * Persistent localStorage demo engine for client-side evaluation
 */

(function (window) {
  const STORAGE_KEYS = {
    PRODUCTS: 'retrorack_products_v1',
    ORDERS: 'retrorack_orders_v1',
    USERS: 'retrorack_users_v1',
    ADMINS: 'retrorack_admins_v1',
    COUPONS: 'retrorack_coupons_v1',
    CART: 'retrorack_cart_v1',
    AUTH: 'retrorack_auth_v1',
    COUPON_ACTIVE: 'retrorack_active_coupon_v1'
  };

  const DEFAULT_PRODUCTS = [
    {
      id: 1,
      name: "Sonata White Men's Retro Shirt",
      category: "Men's Wear",
      price: 850.00,
      stock: 24,
      image_path: "./images/product-3.jpg",
      is_featured: 1,
      description: "Classic relaxed-fit retro shirt in off-white weave, featuring double chest pockets and camp collar design from the late 90s aesthetic.",
      created_at: "2026-08-15 10:30:00"
    },
    {
      id: 2,
      name: "Concepts Solid Vintage Rose Polo",
      category: "Men's Wear",
      price: 950.00,
      stock: 18,
      image_path: "./images/product-2.jpg",
      is_featured: 1,
      description: "Premium washed pique cotton polo shirt in dusky rose with contrast tipping and vintage tortoiseshell button closures.",
      created_at: "2026-08-18 14:15:00"
    },
    {
      id: 3,
      name: "Quis Nostrud Oversized Athletic Tee",
      category: "Men's Wear",
      price: 700.00,
      stock: 35,
      image_path: "./images/product-1.jpg",
      is_featured: 1,
      description: "Heavyweight drop-shoulder graphic t-shirt crafted from 240gsm ring-spun cotton. High-ribbed collar and distressed retro graphic print.",
      created_at: "2026-08-20 09:00:00"
    },
    {
      id: 4,
      name: "Navy Heritage Corduroy Overshirt",
      category: "Men's Wear",
      price: 1250.00,
      stock: 12,
      image_path: "./images/product-4.jpg",
      is_featured: 1,
      description: "Durable 8-wale corduroy button-down overshirt in deep navy blue. Perfect layering piece for all seasons with custom brass buttons.",
      created_at: "2026-08-22 11:45:00"
    },
    {
      id: 5,
      name: "Sunset Mustard Vintage Crewneck",
      category: "Women's Wear",
      price: 1100.00,
      stock: 15,
      image_path: "./images/product-5.jpg",
      is_featured: 1,
      description: "Brushed fleece vintage sweatshirt with ribbed cuffs and hem. Garment-dyed for a lived-in retro fade and cozy everyday warmth.",
      created_at: "2026-08-24 16:20:00"
    },
    {
      id: 6,
      name: "Retro Colorblock Windbreaker 1994",
      category: "Accessories",
      price: 1450.00,
      stock: 9,
      image_path: "./images/product-6.jpg",
      is_featured: 0,
      description: "Nostalgic nylon windbreaker jacket with neon teal and magenta block paneling. Mesh lining, storm flap, and hidden hood toggle.",
      created_at: "2026-08-25 13:10:00"
    },
    {
      id: 7,
      name: "Distressed Indigo Selvedge Denim",
      category: "Men's Wear",
      price: 1850.00,
      stock: 14,
      image_path: "./images/product-7.jpg",
      is_featured: 1,
      description: "Authentic 13.5oz red-line selvedge denim in straight-leg cut with authentic whiskering, vintage honeycombs, and chain-stitched hem.",
      created_at: "2026-08-28 17:00:00"
    },
    {
      id: 8,
      name: "Vintage 1980s Retro Canvas Runner",
      category: "Accessories",
      price: 1650.00,
      stock: 11,
      image_path: "./images/product-8.jpg",
      is_featured: 1,
      description: "Heritage low-top sneakers in off-white canvas with gum rubber waffle outsoles and cushioned vintage foam insoles.",
      created_at: "2026-09-01 08:30:00"
    },
    {
      id: 9,
      name: "Azure Retro Graphic Tee",
      category: "Men's Wear",
      price: 750.00,
      stock: 22,
      image_path: "./uploads/Blue_Tshirt_1734462547.jpg",
      is_featured: 0,
      description: "Electric azure blue tee with vintage typographic screen print. Super-soft combed cotton for everyday comfort and casual styling.",
      created_at: "2026-09-05 12:00:00"
    },
    {
      id: 10,
      name: "Sage Green Relaxed Knit Polo",
      category: "Men's Wear",
      price: 990.00,
      stock: 16,
      image_path: "./uploads/Greeny_Polo_1734462617.jpg",
      is_featured: 0,
      description: "Textured open-knit polo sweater in earthy sage green. Lightweight breathable fabric with retro notched collar.",
      created_at: "2026-09-08 14:40:00"
    },
    {
      id: 11,
      name: "Retro Rack Signature Camp Shirt",
      category: "Men's Wear",
      price: 1150.00,
      stock: 20,
      image_path: "./uploads/Sleeper_Shirt_1734462583.jpg",
      is_featured: 0,
      description: "Lightweight rayon resort shirt in retro botanical print with fluid drape, Cuban collar, and straight hem.",
      created_at: "2026-09-10 15:20:00"
    }
  ];

  const DEFAULT_USERS = [
    {
      id: 1,
      fullname: "Alex Mercer",
      username: "alex",
      email: "alex.mercer@gmail.com",
      phone: "+63 917 882 4519",
      gender: "male",
      dob: "1998-05-14",
      created_at: "2026-07-12 11:20:00",
      address: {
        house_number: "Unit 402",
        street: "Vintage Boulevard",
        barangay: "San Isidro",
        city: "Naga City",
        province: "Camarines Sur",
        postal_code: "4400",
        country: "Philippines"
      }
    },
    {
      id: 2,
      fullname: "Maria Clara Santos",
      username: "maria",
      email: "maria.santos@yahoo.com",
      phone: "+63 928 374 6510",
      gender: "female",
      dob: "2000-08-22",
      created_at: "2026-08-01 15:45:00",
      address: {
        house_number: "Lot 15 Block 3",
        street: "Heritage Lane",
        barangay: "Baras",
        city: "Daet",
        province: "Camarines Norte",
        postal_code: "4600",
        country: "Philippines"
      }
    }
  ];

  const DEFAULT_ADMINS = [
    {
      id: 1,
      username: "admin",
      fullname: "Louis Ricafrente",
      role: "Super Admin",
      active: 1
    },
    {
      id: 2,
      username: "curator",
      fullname: "Elena Rostova",
      role: "Store Manager",
      active: 1
    }
  ];

  const DEFAULT_COUPONS = [
    {
      id: 1,
      code: "RETRO20",
      discount_percentage: 20,
      expiry_date: "2026-12-31"
    },
    {
      id: 2,
      code: "WELCOME10",
      discount_percentage: 10,
      expiry_date: "2026-12-31"
    },
    {
      id: 3,
      code: "VINTAGE15",
      discount_percentage: 15,
      expiry_date: "2026-11-30"
    }
  ];

  const DEFAULT_ORDERS = [
    {
      id: 1001,
      user_id: 1,
      user_name: "Alex Mercer",
      order_date: "2026-09-20 14:32:00",
      total_amount: 2100.00,
      payment_method: "GCash",
      status: "Delivered",
      items: [
        { product_id: 1, name: "Sonata White Men's Retro Shirt", quantity: 1, price: 850.00, image_path: "./images/product-3.jpg" },
        { product_id: 4, name: "Navy Heritage Corduroy Overshirt", quantity: 1, price: 1250.00, image_path: "./images/product-4.jpg" }
      ]
    },
    {
      id: 1002,
      user_id: 2,
      user_name: "Maria Clara Santos",
      order_date: "2026-09-21 16:15:00",
      total_amount: 1650.00,
      payment_method: "Credit Card",
      status: "Shipped",
      items: [
        { product_id: 8, name: "Vintage 1980s Retro Canvas Runner", quantity: 1, price: 1650.00, image_path: "./images/product-8.jpg" }
      ]
    },
    {
      id: 1003,
      user_id: 1,
      user_name: "Alex Mercer",
      order_date: "2026-09-22 09:40:00",
      total_amount: 1850.00,
      payment_method: "Cash on Delivery",
      status: "Processing",
      items: [
        { product_id: 7, name: "Distressed Indigo Selvedge Denim", quantity: 1, price: 1850.00, image_path: "./images/product-7.jpg" }
      ]
    },
    {
      id: 1004,
      user_id: 2,
      user_name: "Maria Clara Santos",
      order_date: "2026-09-23 11:05:00",
      total_amount: 1450.00,
      payment_method: "GCash",
      status: "Pending",
      items: [
        { product_id: 6, name: "Retro Colorblock Windbreaker 1994", quantity: 1, price: 1450.00, image_path: "./images/product-6.jpg" }
      ]
    }
  ];

  function getStored(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.warn('retroStore read error for ' + key, e);
      return defaultVal;
    }
  }

  function setStored(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('retroStore write error for ' + key, e);
    }
  }

  // Initialize storage if empty
  function initStore() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      setStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      setStored(STORAGE_KEYS.USERS, DEFAULT_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
      setStored(STORAGE_KEYS.ADMINS, DEFAULT_ADMINS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
      setStored(STORAGE_KEYS.COUPONS, DEFAULT_COUPONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      setStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      setStored(STORAGE_KEYS.CART, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUTH)) {
      // Default to guest or customer session
      setStored(STORAGE_KEYS.AUTH, {
        isLoggedIn: true,
        role: 'customer',
        user: DEFAULT_USERS[0]
      });
    }
  }

  initStore();

  const RetroStore = {
    // Products
    getProducts: function (filters = {}) {
      let prods = getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      if (filters.category && filters.category !== 'All') {
        prods = prods.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        prods = prods.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
      }
      if (filters.featured) {
        prods = prods.filter(p => p.is_featured === 1);
      }
      if (filters.sort) {
        if (filters.sort === 'price_asc') prods.sort((a, b) => a.price - b.price);
        else if (filters.sort === 'price_desc') prods.sort((a, b) => b.price - a.price);
        else if (filters.sort === 'newest') prods.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      return prods;
    },

    getProduct: function (id) {
      const prods = getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      return prods.find(p => Number(p.id) === Number(id)) || null;
    },

    addProduct: function (productData) {
      const prods = getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      const newId = prods.length > 0 ? Math.max(...prods.map(p => Number(p.id))) + 1 : 1;
      const newProduct = {
        id: newId,
        name: productData.name || 'Untitled Retro Item',
        category: productData.category || "Men's Wear",
        price: parseFloat(productData.price) || 0,
        stock: parseInt(productData.stock, 10) || 0,
        image_path: productData.image_path || './images/product-1.jpg',
        is_featured: productData.is_featured ? 1 : 0,
        description: productData.description || '',
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      prods.unshift(newProduct);
      setStored(STORAGE_KEYS.PRODUCTS, prods);
      return newProduct;
    },

    updateProduct: function (id, updates) {
      const prods = getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      const idx = prods.findIndex(p => Number(p.id) === Number(id));
      if (idx !== -1) {
        prods[idx] = { ...prods[idx], ...updates };
        setStored(STORAGE_KEYS.PRODUCTS, prods);
        return prods[idx];
      }
      return null;
    },

    deleteProduct: function (id) {
      let prods = getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      prods = prods.filter(p => Number(p.id) !== Number(id));
      setStored(STORAGE_KEYS.PRODUCTS, prods);
      return true;
    },

    // Cart
    getCart: function () {
      const cart = getStored(STORAGE_KEYS.CART, []);
      const prods = getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      return cart.map(item => {
        const prod = prods.find(p => Number(p.id) === Number(item.product_id));
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          name: prod ? prod.name : (item.name || 'Product'),
          price: prod ? prod.price : (item.price || 0),
          image_path: prod ? prod.image_path : (item.image_path || './images/product-1.jpg'),
          stock: prod ? prod.stock : 99
        };
      });
    },

    addToCart: function (productId, quantity = 1) {
      let cart = getStored(STORAGE_KEYS.CART, []);
      const prod = this.getProduct(productId);
      if (!prod) return false;

      const existingIndex = cart.findIndex(c => Number(c.product_id) === Number(productId));
      if (existingIndex > -1) {
        cart[existingIndex].quantity += parseInt(quantity, 10);
      } else {
        cart.push({
          product_id: Number(productId),
          quantity: parseInt(quantity, 10)
        });
      }
      setStored(STORAGE_KEYS.CART, cart);
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: this.getCartCount() } }));
      return true;
    },

    updateCartQuantity: function (productId, quantity) {
      let cart = getStored(STORAGE_KEYS.CART, []);
      const qty = parseInt(quantity, 10);
      if (qty <= 0) {
        cart = cart.filter(c => Number(c.product_id) !== Number(productId));
      } else {
        const item = cart.find(c => Number(c.product_id) === Number(productId));
        if (item) item.quantity = qty;
      }
      setStored(STORAGE_KEYS.CART, cart);
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: this.getCartCount() } }));
      return cart;
    },

    removeFromCart: function (productId) {
      let cart = getStored(STORAGE_KEYS.CART, []);
      cart = cart.filter(c => Number(c.product_id) !== Number(productId));
      setStored(STORAGE_KEYS.CART, cart);
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: this.getCartCount() } }));
      return cart;
    },

    clearCart: function () {
      setStored(STORAGE_KEYS.CART, []);
      setStored(STORAGE_KEYS.COUPON_ACTIVE, null);
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: 0 } }));
    },

    getCartCount: function () {
      const cart = getStored(STORAGE_KEYS.CART, []);
      return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    getCartTotals: function () {
      const items = this.getCart();
      const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      const activeCoupon = getStored(STORAGE_KEYS.COUPON_ACTIVE, null);
      let discountAmount = 0;
      if (activeCoupon) {
        discountAmount = (subtotal * activeCoupon.discount_percentage) / 100;
      }
      const shipping = subtotal > 0 ? (subtotal >= 2000 ? 0 : 150) : 0;
      const total = Math.max(0, subtotal - discountAmount + shipping);

      return {
        subtotal,
        discountAmount,
        discountPercentage: activeCoupon ? activeCoupon.discount_percentage : 0,
        couponCode: activeCoupon ? activeCoupon.code : null,
        shipping,
        total,
        itemCount: items.reduce((sum, i) => sum + i.quantity, 0)
      };
    },

    // Coupons
    getCoupons: function () {
      return getStored(STORAGE_KEYS.COUPONS, DEFAULT_COUPONS);
    },

    applyCoupon: function (code) {
      if (!code) return { success: false, message: 'Please enter a coupon code.' };
      const coupons = this.getCoupons();
      const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
      if (!coupon) {
        return { success: false, message: 'Invalid coupon code.' };
      }
      const today = new Date().toISOString().substring(0, 10);
      if (coupon.expiry_date && coupon.expiry_date < today) {
        return { success: false, message: 'This coupon has expired.' };
      }
      setStored(STORAGE_KEYS.COUPON_ACTIVE, coupon);
      return {
        success: true,
        message: `Coupon ${coupon.code} applied! (${coupon.discount_percentage}% OFF)`,
        coupon
      };
    },

    getActiveCoupon: function () {
      return getStored(STORAGE_KEYS.COUPON_ACTIVE, null);
    },

    removeCoupon: function () {
      setStored(STORAGE_KEYS.COUPON_ACTIVE, null);
      return true;
    },

    addCoupon: function (code, discount, expiry) {
      const coupons = this.getCoupons();
      const newId = coupons.length > 0 ? Math.max(...coupons.map(c => c.id)) + 1 : 1;
      const newCoupon = {
        id: newId,
        code: code.trim().toUpperCase(),
        discount_percentage: parseInt(discount, 10),
        expiry_date: expiry
      };
      coupons.push(newCoupon);
      setStored(STORAGE_KEYS.COUPONS, coupons);
      return newCoupon;
    },

    deleteCoupon: function (id) {
      let coupons = this.getCoupons();
      coupons = coupons.filter(c => Number(c.id) !== Number(id));
      setStored(STORAGE_KEYS.COUPONS, coupons);
      return true;
    },

    // Orders
    getOrders: function (userId = null) {
      let orders = getStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
      if (userId) {
        orders = orders.filter(o => Number(o.user_id) === Number(userId));
      }
      return orders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
    },

    getOrder: function (orderId) {
      const orders = getStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
      return orders.find(o => Number(o.id) === Number(orderId)) || null;
    },

    placeOrder: function (orderData) {
      const orders = getStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
      const user = this.getCurrentUser();
      const totals = this.getCartTotals();
      const items = this.getCart();

      if (items.length === 0) return { success: false, message: 'Cart is empty' };

      const newId = orders.length > 0 ? Math.max(...orders.map(o => Number(o.id))) + 1 : 1001;
      const newOrder = {
        id: newId,
        user_id: user ? user.id : 1,
        user_name: user ? user.fullname : (orderData.fullname || 'Guest Customer'),
        order_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        total_amount: totals.total,
        payment_method: orderData.payment_method || 'Cash on Delivery',
        status: 'Pending',
        shipping_address: orderData.address || (user && user.address ? `${user.address.house_number} ${user.address.street}, ${user.address.barangay}, ${user.address.city}` : 'Default Address'),
        items: items.map(item => ({
          product_id: item.product_id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image_path: item.image_path
        }))
      };

      orders.unshift(newOrder);
      setStored(STORAGE_KEYS.ORDERS, orders);

      // Decrement stock
      const prods = getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      items.forEach(cartItem => {
        const prod = prods.find(p => Number(p.id) === Number(cartItem.product_id));
        if (prod) {
          prod.stock = Math.max(0, prod.stock - cartItem.quantity);
        }
      });
      setStored(STORAGE_KEYS.PRODUCTS, prods);

      this.clearCart();
      return { success: true, order: newOrder };
    },

    updateOrderStatus: function (orderId, newStatus) {
      const orders = getStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
      const order = orders.find(o => Number(o.id) === Number(orderId));
      if (order) {
        order.status = newStatus;
        setStored(STORAGE_KEYS.ORDERS, orders);
        return true;
      }
      return false;
    },

    deleteOrder: function (orderId) {
      let orders = getStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
      orders = orders.filter(o => Number(o.id) !== Number(orderId));
      setStored(STORAGE_KEYS.ORDERS, orders);
      return true;
    },

    // Users
    getUsers: function () {
      return getStored(STORAGE_KEYS.USERS, DEFAULT_USERS);
    },

    getUser: function (id) {
      const users = this.getUsers();
      return users.find(u => Number(u.id) === Number(id)) || null;
    },

    addUser: function (userData) {
      const users = this.getUsers();
      const newId = users.length > 0 ? Math.max(...users.map(u => Number(u.id))) + 1 : 1;
      const newUser = {
        id: newId,
        fullname: userData.fullname || 'New Customer',
        username: userData.username || `user_${newId}`,
        email: userData.email || `user${newId}@example.com`,
        phone: userData.phone || '+63 900 000 0000',
        gender: userData.gender || 'male',
        dob: userData.dob || '2000-01-01',
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        address: userData.address || {
          house_number: '100',
          street: 'Market St',
          barangay: 'Central',
          city: 'Naga City',
          province: 'Camarines Sur',
          postal_code: '4400',
          country: 'Philippines'
        }
      };
      users.unshift(newUser);
      setStored(STORAGE_KEYS.USERS, users);
      return newUser;
    },

    updateUser: function (id, updates) {
      const users = this.getUsers();
      const idx = users.findIndex(u => Number(u.id) === Number(id));
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        setStored(STORAGE_KEYS.USERS, users);
        return users[idx];
      }
      return null;
    },

    deleteUser: function (id) {
      let users = this.getUsers();
      users = users.filter(u => Number(u.id) !== Number(id));
      setStored(STORAGE_KEYS.USERS, users);
      return true;
    },

    // Admins
    getAdmins: function () {
      return getStored(STORAGE_KEYS.ADMINS, DEFAULT_ADMINS);
    },

    addAdmin: function (adminData, role = 'Store Manager') {
      const admins = this.getAdmins();
      const newId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;
      const username = typeof adminData === 'string' ? adminData : (adminData.username || `admin_${newId}`);
      const fullname = typeof adminData === 'object' && adminData.fullname ? adminData.fullname : (username.charAt(0).toUpperCase() + username.slice(1));
      const adminRole = typeof adminData === 'object' && adminData.role ? adminData.role : role;

      const newAdmin = {
        id: newId,
        username,
        fullname,
        role: adminRole,
        active: 1
      };
      admins.push(newAdmin);
      setStored(STORAGE_KEYS.ADMINS, admins);
      return newAdmin;
    },

    deleteAdmin: function (id) {
      let admins = this.getAdmins();
      // Keep at least 1 super admin
      if (Number(id) === 1) return false;
      admins = admins.filter(a => Number(a.id) !== Number(id));
      setStored(STORAGE_KEYS.ADMINS, admins);
      return true;
    },

    // Authentication & Demo Profiles
    getAuth: function () {
      return getStored(STORAGE_KEYS.AUTH, {
        isLoggedIn: true,
        role: 'customer',
        user: DEFAULT_USERS[0]
      });
    },

    getCurrentUser: function () {
      const auth = this.getAuth();
      return auth.user;
    },

    isAdmin: function () {
      const auth = this.getAuth();
      return auth.isLoggedIn && (auth.role === 'admin' || auth.role === 'Super Admin');
    },

    isLoggedIn: function () {
      const auth = this.getAuth();
      return !!auth.isLoggedIn;
    },

    loginAsAdmin: function (username = 'admin') {
      const admin = DEFAULT_ADMINS.find(a => a.username === username) || DEFAULT_ADMINS[0];
      const authData = {
        isLoggedIn: true,
        role: 'admin',
        user: {
          id: admin.id,
          username: admin.username,
          fullname: admin.fullname,
          role: admin.role,
          email: 'admin@retorack.local'
        }
      };
      setStored(STORAGE_KEYS.AUTH, authData);
      return authData;
    },

    loginAsCustomer: function (username = 'alex') {
      const user = DEFAULT_USERS.find(u => u.username === username) || DEFAULT_USERS[0];
      const authData = {
        isLoggedIn: true,
        role: 'customer',
        user
      };
      setStored(STORAGE_KEYS.AUTH, authData);
      return authData;
    },

    logout: function () {
      const authData = {
        isLoggedIn: false,
        role: 'guest',
        user: null
      };
      setStored(STORAGE_KEYS.AUTH, authData);
      return authData;
    },

    // Analytics & Reports
    getStats: function () {
      const prods = this.getProducts();
      const orders = this.getOrders();
      const users = this.getUsers();

      const deliveredOrders = orders.filter(o => o.status === 'Delivered');
      const totalRevenue = deliveredOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);

      // Top products
      const productSales = {};
      orders.forEach(order => {
        if (order.status !== 'Cancelled' && order.items) {
          order.items.forEach(item => {
            productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
          });
        }
      });

      const topProducts = Object.entries(productSales)
        .map(([name, qty]) => ({ name, quantity: qty }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      return {
        totalProducts: prods.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: totalRevenue,
        deliveredOrdersCount: deliveredOrders.length,
        topProducts
      };
    },

    getMonthlySalesData: function () {
      const months = ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'];
      const sales = [4850.00, 6200.00, 7850.00, 9400.00, 11250.00, 14200.00];

      // Add actual delivered orders from this month
      const currentMonthDelivered = this.getOrders()
        .filter(o => o.status === 'Delivered')
        .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

      if (currentMonthDelivered > 0) {
        sales[sales.length - 1] = Math.max(sales[sales.length - 1], currentMonthDelivered);
      }

      return { labels: months, data: sales };
    },

    // Reset Demo State
    resetDemoData: function () {
      setStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      setStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
      setStored(STORAGE_KEYS.USERS, DEFAULT_USERS);
      setStored(STORAGE_KEYS.ADMINS, DEFAULT_ADMINS);
      setStored(STORAGE_KEYS.COUPONS, DEFAULT_COUPONS);
      setStored(STORAGE_KEYS.CART, []);
      setStored(STORAGE_KEYS.COUPON_ACTIVE, null);
      this.loginAsAdmin();
      return true;
    }
  };

  window.RetroStore = RetroStore;
})(window);
