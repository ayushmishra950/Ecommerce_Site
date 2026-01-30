import { Product } from '@/types';
import headphonesImg from '@/assets/products/headphones.jpg';
import smartwatchImg from '@/assets/products/smartwatch.jpg';
import sneakersImg from '@/assets/products/sneakers.jpg';
import backpackImg from '@/assets/products/backpack.jpg';
import sunglassesImg from '@/assets/products/sunglasses.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.',
    image: headphonesImg,
    category: 'Electronics',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    variants: [
      { id: 'v1', name: 'Color', type: 'color', options: ['Black', 'Silver', 'Gold'] }
    ]
  },
  {
    id: '2',
    name: 'Luxury Smart Watch',
    price: 449.99,
    originalPrice: 549.99,
    description: 'Stay connected with style. Our luxury smartwatch features health monitoring, GPS, and a stunning AMOLED display.',
    image: smartwatchImg,
    category: 'Electronics',
    rating: 4.9,
    reviews: 187,
    inStock: true,
    variants: [
      { id: 'v2', name: 'Size', type: 'size', options: ['40mm', '44mm'] },
      { id: 'v3', name: 'Color', type: 'color', options: ['Silver', 'Black', 'Rose Gold'] }
    ]
  },
  {
    id: '3',
    name: 'Classic White Sneakers',
    price: 149.99,
    description: 'Timeless design meets modern comfort. These premium leather sneakers are perfect for any occasion.',
    image: sneakersImg,
    category: 'Fashion',
    rating: 4.7,
    reviews: 312,
    inStock: true,
    variants: [
      { id: 'v4', name: 'Size', type: 'size', options: ['7', '8', '9', '10', '11', '12'] }
    ]
  },
  {
    id: '4',
    name: 'Urban Travel Backpack',
    price: 129.99,
    originalPrice: 169.99,
    description: 'The perfect companion for urban adventures. Water-resistant, laptop-friendly, and incredibly stylish.',
    image: backpackImg,
    category: 'Accessories',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    variants: [
      { id: 'v5', name: 'Color', type: 'color', options: ['Gray', 'Black', 'Navy'] }
    ]
  },
  {
    id: '5',
    name: 'Aviator Sunglasses',
    price: 199.99,
    description: 'Classic aviator design with premium polarized lenses. UV400 protection for your eyes.',
    image: sunglassesImg,
    category: 'Accessories',
    rating: 4.5,
    reviews: 98,
    inStock: true,
    variants: [
      { id: 'v6', name: 'Color', type: 'color', options: ['Gold/Black', 'Silver/Blue', 'Black/Gray'] }
    ]
  },
  {
    id: '6',
    name: 'Wireless Earbuds Pro',
    price: 179.99,
    originalPrice: 229.99,
    description: 'Compact design with powerful sound. Features active noise cancellation and 24-hour battery with case.',
    image: headphonesImg,
    category: 'Electronics',
    rating: 4.7,
    reviews: 421,
    inStock: false,
    variants: [
      { id: 'v7', name: 'Color', type: 'color', options: ['White', 'Black'] }
    ]
  }
];

export const categories = [
  { id: '1', name: 'Electronics', count: 45, icon: 'Smartphone' },
  { id: '2', name: 'Fashion', count: 128, icon: 'Shirt' },
  { id: '3', name: 'Accessories', count: 67, icon: 'Watch' },
  { id: '4', name: 'Home & Living', count: 89, icon: 'Home' },
  { id: '5', name: 'Sports', count: 34, icon: 'Dumbbell' },
  { id: '6', name: 'Beauty', count: 56, icon: 'Sparkles' }
];
