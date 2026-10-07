import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, ClipboardList, Flame, Leaf, MapPin, Menu as MenuIcon, Minus, PackageCheck, Plus, ShoppingBag, Sparkles, Star, X } from 'lucide-react';
import './styles.css';

const products = [
  { id: 'rush-hour', name: 'The Rush Hour', tag: 'THE CROWD PLEASER', category: 'Burgers', price: 249, rating: '4.9', description: 'Two smashed patties, molten American cheese, rush sauce, pickles & a potato bun.', image: 'photo-1568901346375-23c9450c58cd', color: '#ffb03a', badge: 'BESTSELLER' },
  { id: 'green-machine', name: 'Green Machine', tag: 'GOOD MOOD FOOD', category: 'Burgers', price: 279, rating: '4.8', description: 'Crispy-edged beef, fresh avocado, green goddess sauce & a little crunch.', image: 'photo-1586190848861-99aa4a171e90', color: '#c9df69', badge: 'FRESH PICK' },
  { id: 'hot-mess', name: 'Hot Mess', tag: 'BRING THE HEAT', category: 'Burgers', price: 269, rating: '4.9', description: 'Fire-kissed beef, pepper jack, jalapeño relish & our dangerously good hot honey.', image: 'photo-1550547660-d9450f859349', color: '#fb7957', badge: 'A LITTLE SPICY' },
  { id: 'mushroom-mood', name: 'Mushroom Mood', tag: 'EARTHY & EXTRA', category: 'Burgers', price: 259, rating: '4.7', description: 'Crispy portobello, melty Swiss, caramelized onion & truffle-ish magic.', image: 'photo-1571091718767-18b5b1457add', color: '#d9bc9a', badge: 'PLANT FORWARD' },
  { id: 'crispy-chicken', name: 'Crispy Bird', tag: 'NO BEEF, NO BORING', category: 'Burgers', price: 229, rating: '4.8', description: 'Buttermilk-crispy chicken, cool slaw, dill pickles & a little heat.', image: 'photo-1606755962773-d324e0a13086', color: '#e9bb77', badge: 'GOLDEN & CRISPY' },
  { id: 'smoky-bbq', name: 'Smoky BBQ Stack', tag: 'SLOW SMOKE, BIG MOOD', category: 'Burgers', price: 289, rating: '4.8', description: 'Smoky BBQ glaze, double cheese, crispy onions & a juicy smashed patty.', image: 'photo-1561758033-d89a9ad46330', color: '#d99759', badge: 'SAUCE BOSS' },
  { id: 'paneer-crunch', name: 'Paneer Crunch', tag: 'THE DESI FAVOURITE', category: 'Burgers', price: 219, rating: '4.8', description: 'Crispy masala paneer, mint mayo, crunchy cabbage & a toasted sesame bun.', image: 'photo-1550317138-10000687a72b', color: '#c3d278', badge: 'VEG FAVOURITE' },
  { id: 'crinkle-cut', name: 'Crinkle Cuts', tag: 'GOLDEN HOUR, ANY HOUR', category: 'Fries', price: 99, rating: '4.8', description: 'Golden, ridged, and ready for a dip in our signature rush sauce.', image: 'photo-1573080496219-bb080dd4f877', color: '#f7c44e', badge: 'EXTRA CRUNCH' },
  { id: 'loaded-fries', name: 'Fully Loaded Fries', tag: 'GO ON, GET LOADED', category: 'Fries', price: 159, rating: '4.9', description: 'Crispy fries, gooey cheese sauce, crunchy onions & a spicy drizzle.', image: 'photo-1518013431117-eb1465fa5752', color: '#edbd53', badge: 'CROWD FAVOURITE' },
  { id: 'peri-fries', name: 'Peri Peri Fries', tag: 'A LITTLE KICK', category: 'Fries', price: 119, rating: '4.7', description: 'Hot, golden fries tossed in our tangy, smoky peri peri spice.', image: 'photo-1630384060421-cb20d0e0649d', color: '#e68c52', badge: 'SPICE IT UP' },
  { id: 'shakes-on-you', name: 'Strawberry Shake', tag: 'THE SWEET SPOT', category: 'Shakes', price: 149, rating: '4.9', description: 'Real strawberries, thick vanilla soft serve, and absolutely no regrets.', image: 'photo-1572490122747-3968b75cc699', color: '#f2a3a8', badge: 'REAL FRUIT' },
  { id: 'choco-shake', name: 'Chocolate Shake', tag: 'MAIN CHARACTER ENERGY', category: 'Shakes', price: 149, rating: '4.9', description: 'Deep chocolate, creamy vanilla, topped with a whole lot of happy.', image: 'photo-1577805947697-89e18249d767', color: '#b78768', badge: 'DESSERT FIRST' },
  { id: 'mango-shake', name: 'Mango Mania', tag: 'SUNSHINE IN A CUP', category: 'Shakes', price: 159, rating: '4.8', description: 'Alphonso mango blended into a creamy, sunshine-yellow shake.', image: 'photo-1579954115545-a95591f28bfc', color: '#f2c75d', badge: 'SEASONAL STAR' },
  { id: 'oreo-shake', name: 'Cookies & Cream', tag: 'CRUNCH MEETS CREAM', category: 'Shakes', price: 169, rating: '4.9', description: 'Cookie crumbles, rich chocolate and cold, dreamy vanilla soft serve.', image: 'photo-1572490122747-3968b75cc699', color: '#b7a6ce', badge: 'COOKIE CRUSH' },
  { id: 'cold-brew', name: 'Smooth Cold Brew', tag: 'SLOW STEEP, FAST LOVE', category: 'Coffee', price: 129, rating: '4.8', description: 'Smooth, slow-steeped coffee poured over ice. Pure pick-me-up.', image: 'photo-1461023058943-07fcbe16d735', color: '#ad8a70', badge: 'SLOW STEEPED' },
  { id: 'iced-latte', name: 'Iced Vanilla Latte', tag: 'COOL, CREAMY, VERY NICE', category: 'Coffee', price: 149, rating: '4.8', description: 'Double espresso, cold milk & just a little house-made vanilla.', image: 'photo-1461023058943-07fcbe16d735', color: '#ddbd92', badge: 'A LITTLE SWEET' },
  { id: 'hot-coffee', name: 'Classic Hot Coffee', tag: 'YOUR COSY MOMENT', category: 'Coffee', price: 99, rating: '4.7', description: 'Freshly brewed, warm and proper comforting. Your dependable classic.', image: 'photo-1509042239860-f550ce710b93', color: '#a78365', badge: 'BREWED FRESH' },
];

const categories = ['All', 'Burgers', 'Fries', 'Shakes', 'Coffee'];
const extras = [
  { id: 'cheese', label: 'Extra cheese', price: 25 },
  { id: 'bacon', label: 'Crispy bacon', price: 40 },
  { id: 'jalapeno', label: 'Jalapeños', price: 15 },
];
const extrasByCategory = {
  Burgers: extras,
  Fries: [
    { id: 'cheese-sauce', label: 'Extra cheese sauce', price: 25 },
    { id: 'peri-dust', label: 'Extra peri peri', price: 15 },
    { id: 'rush-dip', label: 'Rush sauce dip', price: 20 },
  ],
  Shakes: [
    { id: 'whipped-cream', label: 'Whipped cream', price: 20 },
    { id: 'cookie-crunch', label: 'Cookie crumble', price: 25 },
    { id: 'extra-scoop', label: 'Extra ice cream', price: 35 },
  ],
  Coffee: [
    { id: 'extra-shot', label: 'Extra espresso shot', price: 35 },
    { id: 'oat-milk', label: 'Oat milk', price: 25 },
    { id: 'vanilla-syrup', label: 'Vanilla syrup', price: 20 },
  ],
};
const extrasFor = (product) => extrasByCategory[product.category] ?? extras;
const money = (number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(number);
const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const orderStatuses = ['Placed', 'Preparing', 'Out for delivery', 'Delivered'];

function Reveal({ children, className = '', delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms`, ...style }}>{children}</div>;
}

function Header({ cartCount, orderCount, onCart, onOrders, onMenu }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="BurGrush home">bur<span>grush</span><i>.</i></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#menu">The menu</a><a href="#story">Our thing</a><a href="#reviews">Love notes</a>
      </nav>
      <div className="header-actions">
        <a className="location-link" href="#find-us"><MapPin size={15} /> Delivery info</a>
        <button className="history-link" onClick={onOrders}><ClipboardList size={16} /> Orders{orderCount > 0 && <b>{orderCount}</b>}</button>
        <button className="cart-button" onClick={onCart} aria-label={`Open bag, ${cartCount} items`}><ShoppingBag size={18} /><span>Bag</span><b key={cartCount}>{cartCount}</b></button>
        <button className="mobile-menu-button" aria-label="Open menu" onClick={onMenu}><MenuIcon size={23} /></button>
      </div>
    </header>
  );
}

function OrderHistory({ orders, onClose, onAdvance, onReorder, storageError, focusOrderId }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('modal-open');
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('modal-open'); };
  }, [onClose]);

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="cart-drawer order-drawer" role="dialog" aria-modal="true" aria-label="Order history">
        <div className="drawer-header">
          <div><span className="eyebrow">YOUR GOOD-FOOD LOG</span><h2>Order history <span>({orders.length})</span></h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close order history"><X /></button>
        </div>
        <p className="order-demo-note"><Sparkles size={14} /> Demo orders are saved on this device only. No restaurant or courier receives them.</p>
        {storageError && <p className="storage-error" role="alert">{storageError}</p>}
        {orders.length === 0 ? (
          <div className="empty-cart"><span className="empty-bag-icon"><ClipboardList /></span><h3>Your story starts with a bite.</h3><p>Place a demo order and it will show up here—even after you refresh.</p><button className="primary-button" onClick={onClose}>Back to the menu <ArrowRight size={17} /></button></div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => {
              const currentStep = orderStatuses.indexOf(order.status);
              return (
                <article className={`history-order ${focusOrderId === order.id ? 'history-order--focused' : ''}`} key={order.id}>
                  <div className="history-order-top"><span><PackageCheck size={16} /> ORDER {order.id}</span><strong>{money(order.total)}</strong></div>
                  <p className="history-order-date">{new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  <div className="history-order-items">{order.items.map((item, index) => <span key={`${order.id}-${index}`}>{item.quantity} × {item.product.name}</span>)}</div>
                  <div className="status-track" aria-label={`Order status: ${order.status}`}>{orderStatuses.map((status, index) => <div className={`status-step ${index <= currentStep ? 'complete' : ''}`} key={status}><i>{index < currentStep ? <Check size={10} /> : index + 1}</i><span>{status}</span></div>)}</div>
                  <div className="history-delivery"><MapPin size={13} /><span>{order.customer.name} · {order.customer.address}</span></div>
                  <div className="order-history-actions">
                    {currentStep < orderStatuses.length - 1 ? <button className="demo-status-button" onClick={() => onAdvance(order.id)}><Sparkles size={14} /> Simulate next update <ArrowRight size={14} /></button> : <span className="delivered-note"><Check size={14} /> Demo journey complete</span>}
                    <button className="order-again-button" onClick={() => onReorder(order)}><ShoppingBag size={14} /> Order again</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        <p className="history-footer-note">BurGrush is an ordering demo. Orders, delivery, and payment are not connected to a real service.</p>
      </aside>
    </div>
  );
}

function ProductCard({ product, index, onChoose }) {
  const moveCard = (event) => {
    if (event.pointerType !== 'mouse') return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty('--tilt-x', `${(x - 0.5) * 8}deg`);
    card.style.setProperty('--tilt-y', `${(0.5 - y) * 8}deg`);
    card.style.setProperty('--spot-x', `${x * 100}%`);
    card.style.setProperty('--spot-y', `${y * 100}%`);
    card.classList.add('is-tilting');
  };
  const resetCard = (event) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.classList.remove('is-tilting');
  };
  const category = product.category.toLowerCase();
  return (
    <Reveal className={`product-reveal product-reveal--${category}`} delay={index % 3 * 90} style={{ '--card-delay': `${index % 4 * 65}ms` }}>
      <article className="product-card" data-category={category} onPointerMove={moveCard} onPointerLeave={resetCard}>
        <button className="product-image-button" onClick={() => onChoose(product)} aria-label={`Customize ${product.name}`}>
          <img src={photo(product.image, 720)} alt={product.name} loading="lazy" />
          <span className="product-badge">{product.badge}</span>
          <span className="image-arrow"><ArrowUpRight size={20} /></span>
        </button>
        <div className="product-meta"><span>{product.tag}</span><span><Star size={13} fill="currentColor" /> {product.rating}</span></div>
        <div className="product-heading"><h3>{product.name}</h3><strong>{money(product.price)}</strong></div>
        <p>{product.description}</p>
        <button className="add-button" onClick={() => onChoose(product)}><span>Make it yours</span><Plus size={17} /></button>
      </article>
    </Reveal>
  );
}

function Customizer({ product, onClose, onAdd }) {
  const [selected, setSelected] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const options = extrasFor(product);
  const price = product.price + options.reduce((total, extra) => total + (selected.includes(extra.id) ? extra.price : 0), 0);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('modal-open');
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('modal-open'); };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="customizer-modal" role="dialog" aria-modal="true" aria-labelledby="customizer-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close customization"><X /></button>
        <div className="customizer-photo"><img src={photo(product.image, 900)} alt={product.name} /><span className="photo-sticker"><Sparkles size={14} /> YOUR CALL</span></div>
        <div className="customizer-content">
          <span className="eyebrow">{product.tag}</span><h2 id="customizer-title">Make it <span>yours.</span></h2><p>{product.description}</p>
          <h4>Make it extra <span className="optional">(all optional)</span></h4>
          <div className="extra-list">{options.map((extra) => <button className={`extra-option ${selected.includes(extra.id) ? 'selected' : ''}`} type="button" role="checkbox" aria-checked={selected.includes(extra.id)} key={extra.id} onClick={() => setSelected((current) => current.includes(extra.id) ? current.filter((id) => id !== extra.id) : [...current, extra.id])}><span><span className="fake-check"><Check size={13} /></span>{extra.label}</span><b>+{money(extra.price)}</b></button>)}</div>
          <div className="customizer-bottom"><div className="quantity-picker"><button onClick={() => setQuantity((count) => Math.max(1, count - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity((count) => count + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div><button className="primary-button modal-add" onClick={() => onAdd(product, selected, quantity)}>Add to bag <span>{money(price * quantity)}</span><ArrowRight size={17} /></button></div>
        </div>
      </section>
    </div>
  );
}

function CartDrawer({ items, onClose, onQuantity, onCheckout }) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('modal-open');
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('modal-open'); };
  }, [onClose]);
  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your shopping bag">
        <div className="drawer-header"><div><span className="eyebrow">GOOD CHOICES, GREAT TASTE</span><h2>Your bag <span>({items.reduce((n, item) => n + item.quantity, 0)})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close bag"><X /></button></div>
        {items.length === 0 ? <div className="empty-cart"><span className="empty-bag-icon"><ShoppingBag /></span><h3>It's a little empty in here.</h3><p>Your next favorite meal is one good decision away.</p><button className="primary-button" onClick={onClose}>Find your thing <ArrowRight size={17} /></button></div> : <>
          <div className="cart-items">{items.map((item) => <article className="cart-item" key={item.key}><img src={photo(item.product.image, 240)} alt="" /><div className="cart-item-info"><strong>{item.product.name}</strong><span>{item.extras.length ? item.extras.map((id) => extrasFor(item.product).find((extra) => extra.id === id)?.label).join(', ') : 'The original, no changes'}</span><div className="quantity-picker small"><button onClick={() => onQuantity(item.key, -1)} aria-label={`Remove one ${item.product.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => onQuantity(item.key, 1)} aria-label={`Add one ${item.product.name}`}><Plus size={13} /></button></div></div><b>{money(item.price * item.quantity)}</b></article>)}</div>
          <div className="cart-summary"><p><span>Subtotal</span><b>{money(subtotal)}</b></p><p><span>Delivery</span><b>Demo only</b></p><div className="cart-total"><span>Total</span><strong>{money(subtotal)}</strong></div><button className="primary-button checkout-button" onClick={onCheckout}>Let's check out <ArrowRight size={18} /></button><div className="secure-note"><span>✳</span> Demo bag · no order sent yet.</div></div>
        </>}
      </aside>
    </div>
  );
}

function Checkout({ items, onClose, onComplete, onSuccess }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [placedOrder, setPlacedOrder] = useState(null);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('modal-open');
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('modal-open'); };
  }, [onClose]);
  if (placedOrder) return <div className="modal-backdrop"><section className="success-modal"><div className="success-icon"><Check size={36} /></div><span className="eyebrow">DEMO ORDER SAVED</span><h2>That was a<br /><span>good call.</span></h2><p>Your order <strong>{placedOrder.id}</strong> is saved in this browser. Nothing was sent to a real restaurant.</p><div className="success-order-summary"><span>{placedOrder.items.reduce((sum, item) => sum + item.quantity, 0)} items</span><strong>{money(placedOrder.total)}</strong></div><button className="primary-button" onClick={() => onSuccess(placedOrder.id)}>Track this order <ArrowRight size={17} /></button><span className="order-number">DEMO ONLY · NO PAYMENT TAKEN</span></section></div>;
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="checkout-modal"><button className="icon-button modal-close" onClick={onClose} aria-label="Close checkout"><X /></button><div className="checkout-top"><span className="eyebrow">ALMOST AT THE GOOD PART</span><h2>Let's get this<br /><span>to you.</span></h2><p>Just the essentials. Then it's burger o'clock.</p></div><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const order = { id: `BG-${Date.now().toString().slice(-7)}`, createdAt: new Date().toISOString(), status: orderStatuses[0], total, customer: { name: String(form.get('name')).trim(), email: String(form.get('email')).trim(), address: String(form.get('address')).trim() }, items: items.map((item) => ({ ...item })) }; onComplete(order); setPlacedOrder(order); }}><label>Your name<input name="name" required placeholder="What should we call you?" autoComplete="name" /></label><label>Email address<input name="email" required type="email" placeholder="you@example.com" autoComplete="email" /></label><label>Delivery address<input name="address" required placeholder="Street address, apartment, etc." autoComplete="street-address" /></label><div className="checkout-demo-notice"><PackageCheck size={15} /> Demo only: your details stay in this browser. No order is sent and no payment is taken.</div><div className="checkout-delivery"><span><Clock3 size={16} /> Demo status tracker</span><span><MapPin size={16} /> Not connected</span></div><button className="primary-button checkout-submit" type="submit">Place demo order <strong>{money(total)}</strong><ArrowRight size={17} /></button><p className="checkout-disclaimer">This is a front-end demo, not a real delivery service.</p></form></section></div>;
}

function App() {
  const [category, setCategory] = useState('All');
  const [customizing, setCustomizing] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [addedMessage, setAddedMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [focusedOrderId, setFocusedOrderId] = useState('');
  const [storageError, setStorageError] = useState('');
  const filteredProducts = category === 'All' ? products : products.filter((product) => product.category === category);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    try {
      const savedOrders = window.localStorage.getItem('burgrush-order-history');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        const validOrder = (order) => order
          && typeof order.id === 'string'
          && typeof order.createdAt === 'string'
          && orderStatuses.includes(order.status)
          && Number.isFinite(order.total)
          && order.customer
          && typeof order.customer.name === 'string'
          && typeof order.customer.address === 'string'
          && Array.isArray(order.items)
          && order.items.every((item) => item?.product && typeof item.product.name === 'string' && Number.isFinite(item.quantity));
        if (!Array.isArray(parsedOrders) || !parsedOrders.every(validOrder)) throw new Error('Saved order history has an invalid format.');
        setOrders(parsedOrders);
      }
    } catch (error) {
      setStorageError(`Order history could not be loaded from this browser: ${error.message}`);
    } finally {
      setOrdersLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (!ordersLoaded || storageError) return;
    try {
      window.localStorage.setItem('burgrush-order-history', JSON.stringify(orders));
    } catch (error) {
      setStorageError(`Order history could not be saved on this browser: ${error.message}`);
    }
  }, [orders, ordersLoaded, storageError]);
  useEffect(() => {
    if (!addedMessage) return undefined;
    const timeout = window.setTimeout(() => setAddedMessage(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [addedMessage]);
  const addToCart = (product, selectedExtras, quantity) => {
    const key = `${product.id}-${[...selectedExtras].sort().join('-') || 'original'}`;
    const extrasPrice = extrasFor(product).reduce((sum, extra) => sum + (selectedExtras.includes(extra.id) ? extra.price : 0), 0);
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      return existing ? current.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { key, product, extras: selectedExtras, price: product.price + extrasPrice, quantity }];
    });
    setAddedMessage(`${quantity} × ${product.name} added to your bag`);
    setCustomizing(null);
    setCartOpen(true);
  };
  const updateQuantity = (key, amount) => setCart((current) => current.map((item) => item.key === key ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  const launchCustomizer = (product) => setCustomizing(product);
  const closeCart = () => setCartOpen(false);
  const startCheckout = () => { setCartOpen(false); setCheckoutOpen(true); };
  const finishCheckout = (orderId) => { setCheckoutOpen(false); setCart([]); setFocusedOrderId(orderId); setOrdersOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const reorder = (order) => {
    setCart((current) => order.items.reduce((nextCart, item) => {
      const existing = nextCart.find((entry) => entry.key === item.key);
      return existing
        ? nextCart.map((entry) => entry.key === item.key ? { ...entry, quantity: entry.quantity + item.quantity } : entry)
        : [...nextCart, { ...item }];
    }, current));
    setOrdersOpen(false);
    setCartOpen(true);
    setAddedMessage('Your previous picks are back in your bag');
  };
  const advanceOrder = (orderId) => setOrders((current) => current.map((order) => {
    if (order.id !== orderId) return order;
    const nextStatus = Math.min(orderStatuses.indexOf(order.status) + 1, orderStatuses.length - 1);
    return { ...order, status: orderStatuses[nextStatus] };
  }));
  const moveHero = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--hero-shift-x', `${x * 12}px`);
    event.currentTarget.style.setProperty('--hero-shift-y', `${y * 12}px`);
    event.currentTarget.style.setProperty('--hero-circle-x', `${x * -5}px`);
    event.currentTarget.style.setProperty('--hero-circle-y', `${y * -5}px`);
  };
  const resetHero = (event) => {
    event.currentTarget.style.setProperty('--hero-shift-x', '0px');
    event.currentTarget.style.setProperty('--hero-shift-y', '0px');
    event.currentTarget.style.setProperty('--hero-circle-x', '0px');
    event.currentTarget.style.setProperty('--hero-circle-y', '0px');
  };

  return <div id="top">
    <div className="announcement"><span className="announcement-star">✳</span> BURGRUSH ONLINE DEMO. <a href="#menu">EXPLORE THE MENU <ArrowRight size={12} /></a><span className="announcement-star">✳</span></div>
    <Header cartCount={cartCount} orderCount={orders.length} onCart={() => setCartOpen(true)} onOrders={() => setOrdersOpen(true)} onMenu={() => setMobileOpen((open) => !open)} />
    {mobileOpen && <div className="mobile-nav"><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button><a href="#menu" onClick={() => setMobileOpen(false)}>The menu</a><a href="#story" onClick={() => setMobileOpen(false)}>Our thing</a><a href="#reviews" onClick={() => setMobileOpen(false)}>Love notes</a><button className="mobile-orders-link" onClick={() => { setMobileOpen(false); setOrdersOpen(true); }}><ClipboardList size={16} /> Order history ({orders.length})</button></div>}
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="hero-kicker"><span className="kicker-line" /> BURGERS WITH MAIN CHARACTER ENERGY</div><h1>Big flavor.<br /><span>Zero</span> boring<span className="lime-dot">.</span></h1><p className="hero-description">Good days start with great food.<br />We make the kind of burgers you think about later.</p><div className="hero-actions"><a className="primary-button" href="#menu">Meet your new favorite <ArrowRight size={17} /></a><a className="text-link" href="#story"><span className="play-dot">↘</span> Our not-so-secret sauce</a></div><div className="hero-social-proof"><div className="avatar-stack"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=75" alt="" /><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=75" alt="" /><img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=80&h=80&q=75" alt="" /></div><div><div className="proof-stars"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><span>4.9/5</span></div><span className="proof-caption">from people with excellent taste</span></div></div><a href="#menu" className="scroll-cue"><span>SCROLL FOR THE GOOD STUFF</span><ArrowDown size={14} /></a></div>
        <div className="hero-visual" onPointerMove={moveHero} onPointerLeave={resetHero}><div className="hero-circle"></div><span className="hero-orbit" aria-hidden="true"></span><span className="hero-stamp"><span>MADE FRESH</span><span>NEVER BORING</span><span>✳</span></span><div className="hero-burger-wrap"><img className="hero-burger" src={photo('photo-1568901346375-23c9450c58cd', 1200)} alt="Stacked signature BurGrush burger with fresh lettuce, tomato, cheese, and a toasted sesame bun" /><div className="image-grain"></div></div><div className="ingredient ingredient-lettuce">🥬</div><div className="ingredient ingredient-tomato">🍅</div><div className="ingredient ingredient-cheese">🧀</div><div className="ingredient ingredient-sparkle">✳</div><div className="hero-price-card"><span>THE ONE TO BEAT</span><strong>The Rush Hour <b>{money(products[0].price)}</b></strong><a href="#menu">Try the classic <ArrowRight size={13} /></a></div><span className="hero-side-note">100% REAL, REALLY GOOD</span><div className="hero-image-caption">MADE FOR THE MOMENT.<br />CRAVED FOR THE MEMORY.</div></div>
      </section>
      <section className="ticker" aria-label="BurGrush values"><div className="ticker-track">{Array.from({ length: 3 }, (_, index) => <span key={index}>REAL FOOD, BIG MOOD <b>✳</b> GOOD THINGS TAKE A LITTLE EXTRA <b>✳</b> BUILT FOR YOUR CRAVINGS <b>✳</b> NO SAD BURGERS ALLOWED <b>✳</b></span>)}</div></section>
      <section className="menu-section" id="menu"><div className="section-heading"><Reveal><span className="eyebrow">MEET THE CREW</span><h2>Cravings, <span>meet</span><br />their match.</h2></Reveal><Reveal className="section-heading-side"><p>Big moods. Bigger bites. Everything's made fresh, made to order, and made to make your day a little better.</p><a className="text-link" href="#find-us">See what we're about <ArrowDown size={14} /></a></Reveal></div>
        <div className="menu-controls"><div className="category-tabs" role="tablist" aria-label="Filter menu by category">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}<span>{item === 'All' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}</div><span className="menu-count">{filteredProducts.length} GOOD REASONS TO BE HERE <span>↗</span></span></div>
        <div className="product-grid" key={category}>{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onChoose={launchCustomizer} />)}</div>
        <Reveal className="menu-bottom"><div><span className="menu-bottom-icon"><Flame size={18} /></span><span>THE BEST PART?<br /><strong>There's no wrong choice.</strong></span></div><button onClick={() => setCartOpen(true)} className="text-link">Your bag so far <ArrowRight size={15} /></button></Reveal>
      </section>
      <section className="manifesto" id="story"><div className="manifesto-photo"><img src={photo('photo-1550547660-d9450f859349', 1200)} alt="Freshly made burger with crisp lettuce and melted cheese" loading="lazy" /><span className="manifesto-photo-tag">HONESTLY? GO AHEAD.</span></div><div className="manifesto-copy"><Reveal><span className="eyebrow">NO RULES. JUST REALLY GOOD FOOD.</span><h2>We take our<br />burgers <span>seriously.</span><br />Ourselves?<br />Not so much.</h2><p>Real ingredients. People who give a damn. Recipes made from scratch because shortcuts never tasted this good.</p><a className="cream-button" href="#find-us">A little more about us <ArrowUpRight size={16} /></a><span className="manifesto-doodle">✳</span></Reveal></div></section>
      <section className="promise-strip"><div><span className="promise-icon"><Leaf size={18} /></span><strong>Real food.<br /><span>Real ingredients.</span></strong></div><div><span className="promise-icon"><Clock3 size={18} /></span><strong>Made to order.<br /><span>Worth the wait.</span></strong></div><div><span className="promise-icon"><Sparkles size={18} /></span><strong>Never boring.<br /><span>Never, ever.</span></strong></div></section>
      <section className="review-section" id="reviews"><Reveal><span className="eyebrow">DON'T JUST TAKE OUR WORD FOR IT</span><h2>Love notes from<br />the <span>hungry.</span></h2><div className="review-card"><div className="review-stars">★★★★★</div><blockquote>“I had one bite and immediately texted the group chat. This is not a drill. This is the burger.”</blockquote><div className="review-person"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=75" alt="" /><span><strong>Jamie R.</strong><small>LOCAL REGULAR, BIG FEELINGS</small></span><span className="review-verified"><Check size={13} /> VERIFIED CRAVING</span></div></div><div className="review-pagination"><span>01</span><div><i></i></div><span>03</span></div></Reveal></section>
      <section className="location-section" id="find-us"><div><span className="eyebrow">A CLEAR NOTE ABOUT THIS SITE</span><h2>No fake pins.<br /><span>Just good food.</span><br />In demo mode.</h2><p>BurGrush is an independent web project, not a restaurant listing. There isn't a real storefront or delivery fleet connected to this demo.</p><button className="primary-button" onClick={() => setOrdersOpen(true)}>See your order history <ClipboardList size={16} /></button></div><div className="location-card"><div className="online-demo-card"><span className="online-demo-icon"><PackageCheck size={25} /></span><span className="eyebrow">ONLINE-ONLY PROJECT</span><h3>Made for the web.<br />Ready for your ideas.</h3><p>Try the menu, build a bag and place a demo order. Your order history stays right here in this browser.</p><span className="demo-chip"><i></i> NO REAL STORE · NO PAYMENT</span></div><div className="location-card-footer"><span><strong>YOUR BROWSER IS THE DEMO KITCHEN</strong><small>Order details are stored locally on this device.</small></span><Sparkles size={19} /></div></div></section>
    </main>
    <footer className="site-footer"><div className="footer-main"><a className="wordmark footer-wordmark" href="#top">bur<span>grush</span><i>.</i></a><p>Big flavor. Zero boring.<br />An online-only ordering demo.</p><div className="footer-links"><a href="#menu">The menu</a><a href="#story">Our thing</a><a href="#find-us">Delivery demo</a><a href="#reviews">Say hey</a></div><div className="footer-right"><span>HUNGRY LOOKS GOOD ON YOU.</span><a href="#menu">LET'S FIX THAT <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>© 2025 BURGRUSH. ALL BITE, NO BORING.</span><span>MADE WITH GOOD INTENTIONS & EXTRA PICKLES <span className="footer-heart">♥</span></span></div></footer>
    {customizing && <Customizer key={customizing.id} product={customizing} onClose={() => setCustomizing(null)} onAdd={addToCart} />}
    {cartOpen && <CartDrawer items={cart} onClose={closeCart} onQuantity={updateQuantity} onCheckout={startCheckout} />}
    {checkoutOpen && <Checkout items={cart} onClose={() => setCheckoutOpen(false)} onComplete={(order) => setOrders((current) => [order, ...current])} onSuccess={finishCheckout} />}
    {ordersOpen && <OrderHistory orders={orders} onClose={() => { setOrdersOpen(false); setFocusedOrderId(''); }} onAdvance={advanceOrder} onReorder={reorder} storageError={storageError} focusOrderId={focusedOrderId} />}
    {addedMessage && <div key={addedMessage} className="added-toast" role="status"><span className="toast-check"><Check size={16} /></span><span><strong>Good choice.</strong><small>{addedMessage}</small></span><span className="toast-spark">✳</span></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
