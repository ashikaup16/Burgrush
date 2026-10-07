# BurGrush

An animated, responsive food-ordering storefront for an original burger brand. Browse burgers, fries, shakes, and coffee; customize your order; and try the cart and checkout demo.

## Run locally

```powershell
npm install
npm run dev
```

Open the local preview:

**http://localhost:5173/**

To make the development server available to other devices on your network:

```powershell
npm run dev -- --host 0.0.0.0
```

## Production build

```powershell
npm run build
npm run preview
```

## Tech

- React
- Vite
- CSS animations and responsive styling
- Lucide icons

Menu prices use Indian rupees (INR). Checkout is a front-end demo and does not process payments or send orders to a backend.
