export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  MARKETER = 'MARKETER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  balance: {
    available: number;
    pending: number; // In Escrow
  };
  kycLevel: 'BASIC' | 'ENHANCED' | 'FULL';
  joinedAt: string;
  affiliateCode?: string;
  commissionTier?: 1 | 2 | 3;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  date: string;
}

export enum DomainStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  REJECTED = 'REJECTED'
}

export enum ListingType {
  EXCLUSIVE = 'EXCLUSIVE', // 10% fee
  STANDARD = 'STANDARD',   // 15% fee
  MANAGED = 'MANAGED'      // 20% fee (Marketed by Domnixa)
}

export interface Domain {
  id: string;
  name: string;
  tld: string;
  price: number;
  description: string;
  category: string;
  ageYears: number;
  sellerId: string;
  status: DomainStatus;
  listingType: ListingType;
  views: number;
  createdAt: string;
  offers: Offer[];
  strategy?: 'PLATFORM' | 'GLOBAL' | 'MARKETING';
}

export interface Offer {
    id: string;
    buyerId: string;
    buyerName: string;
    amount: number;
    date: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface Transaction {
  id: string;
  domainId: string;
  domainName: string;
  buyerId: string;
  sellerId: string;
  marketerId?: string; // If affiliate sale
  amount: number;
  platformFee: number;
  marketerCommission: number;
  sellerNet: number;
  date: string;
  paymentMethod: 'STRIPE' | 'BANK_TRANSFER' | 'WALLET';
  status: 'HELD_IN_ESCROW' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Marketing' | 'Investing' | 'Security';
  readTime: string;
  image: string;
}

export const CATEGORIES = [
  'Tech', 'Business', 'Creative', 'Finance', 'Health', 'Education', 'Short'
];