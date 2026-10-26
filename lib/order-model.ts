import mongoose from 'mongoose';

export interface IOrderItem {
  product?: any;
  name: string;
  price: number;
  priceEGP?: number;
  priceSAR?: number;
  qty: number;
  weight?: string;
}

export interface IOrderCustomer {
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  country?: string;
  nationalId?: string;
}

export interface IOrderPricing {
  totalEGP?: number;
  totalSAR?: number;
  totalLocal: number;
  currency: string;
  exchangeRate?: number;
}

export interface IOrderPayment {
  method: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  kashierSessionId?: string;
  kashierTransactionId?: string;
  kashierOrderReference?: string;
  kashierCurrency?: string;
  kashierAmount?: number;
  kashierCardBrand?: string;
  kashierCardLast4?: string;
  kashierPaymentMethod?: string;
  kashierMerchantOrderId?: string;
  paidAt?: Date;
}

export interface IOrderInvoice {
  invoiceNumber?: string;
  invoiceUrl?: string;
  isGenerated: boolean;
  generatedAt?: Date;
}

export interface IOrderDocument {
  _id: string;
  orderId: string;
  customer: IOrderCustomer;
  items: IOrderItem[];
  pricing: IOrderPricing;
  payment: IOrderPayment;
  invoice: IOrderInvoice;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  idempotencyKey?: string;
  notes?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    city: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, default: 'EG' },
    nationalId: { type: String },
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: String,
    price: Number,
    priceEGP: Number,
    priceSAR: Number,
    qty: { type: Number, required: true, min: 1 },
    weight: String,
  }],
  pricing: {
    totalEGP: { type: Number },
    totalSAR: { type: Number },
    totalLocal: { type: Number, required: true },
    currency: { type: String, required: true, default: 'EGP' },
    exchangeRate: { type: Number, default: 1 },
  },
  payment: {
    method: {
      type: String,
      default: 'cash_on_delivery',
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    kashierSessionId: String,
    kashierTransactionId: String,
    kashierOrderReference: String,
    kashierCurrency: String,
    kashierAmount: Number,
    kashierCardBrand: String,
    kashierCardLast4: String,
    kashierPaymentMethod: String,
    kashierMerchantOrderId: String,
    kashierRawResponse: mongoose.Schema.Types.Mixed,
    paidAt: Date,
  },
  invoice: {
    invoiceNumber: String,
    invoiceUrl: String,
    isGenerated: {
      type: Boolean,
      default: false,
    },
    generatedAt: Date,
  },
  status: {
    type: String,
    enum: ['new', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'new',
  },
  idempotencyKey: {
    type: String,
  },
  notes: String,
}, {
  timestamps: true,
  collection: 'orders',
});

// Helper function to generate an invoice number
export function generateInvoiceNumber(orderId: string, createdAt?: string | Date): string {
  const d = createdAt ? new Date(createdAt) : new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const cleanId = (orderId || '').replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase() || 'GL001';
  return `INV-${year}${month}${day}-${cleanId}`;
}

export const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
