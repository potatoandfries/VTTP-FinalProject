export interface Carausel {
  title: string;
  text: string;
  imageUrl: string;
}

export interface Configuration {
  apiUrl: string;
  authUrl: string;
  clientId: string;
  clientSecret: string;
  carausel: Array<Carausel>;
  bannerUrl: string;
  StripesKey: string;
}

export interface User {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  country: string;
  emailVerified: number;
}
export interface Categories{
  category:Category;
}

export interface Category {
    name: string;
}

export interface Color {
  name: string;
  hex:  string;
}

export interface Colors {
  color: Color;
}

export interface Product {
  name: string;
  url: string;
  productVariants: ProductVariant[];
}

export interface ProductVariantResponse {
  id: number;
  name: string;
  url: string;
  productVariant: ProductVariant;
}

export interface ProductDetail {
  name: string;
  url: string;
  sku: string;
  cartDesc: string;
  longDesc: string;
  category: string; 
  productVariantDetails: ProductVariantDetails[];
}
export interface ProductVariant {
  id: number;
  price: number;
  thumb: string;
  color: Color; 
  size: string; 
  material: string; 
}

export interface ProductVariantDetails {
  id: number;
  price: number;
  cargoPrice: number;
  taxPercent: number;
  image: string;
  thumb: string;
  live: number;
  color: string; 
  size: string; 
  material: string; 
}


export interface CartItem {
  id: number;
  url: string;
  name: string;
  price: number;
  amount: number;
  thumb: string;
  stock: number;
  color: Color;
}

export interface Discount {
  discountPercent: number;
  status: number;
}
export interface Cart {
  cartItems: Array<CartItem>;
  discount: Discount;
  totalCartPrice: number;
  totalCargoPrice: number;
  totalPrice: number;
}

export interface Personal {
  shipName: string;
  phone: string;
}

export interface Shipping {
  shipAddress: string;
  billingAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Payment {
  cardOwner: string;
  cardNo: string;
  cardExp: {
    month: string;
    year: string;
  };
  cardCCV: string;
}

export interface Checkout {
  shipName: string;
  shipAddress: string;
  billingAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface OrderItems {
  url: string;
  name: string;
  price: number;
  cargoPrice: number;
  thumb: string;
  amount: number;
  category: { name: string };
  color: Color;
}

export interface Orders {
  id: number;
  shipName: string;
  shipAddress: string;
  billingAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  totalPrice: number;
  totalCargoPrice: number;
  date: number;
  shipped: number;
  cargoFirm: string;
  trackingNumber: string;
  discount: Discount;
  orderItems: Array<OrderItems>;
}


export interface Showcase {
  newlyAdded: Array<Product>;
  mostSelling: Array<ProductVariantResponse>;
  interested: Array<Product>;
}
