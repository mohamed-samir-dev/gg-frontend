'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  RefreshCw,
  Printer,
  Eye,
  Trash2,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  CreditCard,
  Banknote,
  FileText,
  X,
  AlertTriangle,
  Loader2,
  ChevronDown,
} from 'lucide-react';

interface OrderItem {
  name: string;
  price: number;
  qty: number;
  weight?: string;
}

interface Order {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    country?: string;
    nationalId?: string;
  };
  items: OrderItem[];
  pricing: {
    totalLocal?: number;
    totalSAR?: number;
    totalEGP?: number;
    currency?: string;
  };
  payment: {
    method?: string;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    kashierTransactionId?: string;
    kashierCardBrand?: string;
    kashierCardLast4?: string;
  };
  invoice?: {
    invoiceNumber?: string;
    isGenerated?: boolean;
    generatedAt?: string;
  };
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; icon: any; badgeCls: string; dotCls: string }> = {
  new: {
    label: 'جديد',
    icon: Clock,
    badgeCls: 'bg-amber-50 text-amber-800 border-amber-200',
    dotCls: 'bg-amber-500',
  },
  processing: {
    label: 'قيد التجهيز',
    icon: PackageCheck,
    badgeCls: 'bg-blue-50 text-blue-800 border-blue-200',
    dotCls: 'bg-blue-500',
  },
  shipped: {
    label: 'تم الشحن',
    icon: Truck,
    badgeCls: 'bg-purple-50 text-purple-800 border-purple-200',
    dotCls: 'bg-purple-500',
  },
  delivered: {
    label: 'مكتمل / تم التوصيل',
    icon: CheckCircle2,
    badgeCls: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dotCls: 'bg-emerald-500',
  },
  cancelled: {
    label: 'ملغي',
    icon: XCircle,
    badgeCls: 'bg-rose-50 text-rose-800 border-rose-200',
    dotCls: 'bg-rose-500',
  },
};

const PAYMENT_STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  paid: { label: 'مدفوع بنجاح', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  pending: { label: 'بانتظار السداد', cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  failed: { label: 'فشل الدفع', cls: 'bg-rose-100 text-rose-800 border-rose-200' },
  refunded: { label: 'مسترجع', cls: 'bg-stone-100 text-stone-800 border-stone-200' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [totalCount, setTotalCount] = useState(0);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Modals state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [search]);

  const loadOrders = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (debouncedSearch.trim()) params.set('search', debouncedSearch.trim());
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      if (!res.ok) throw new Error('فشل تحميل الطلبات');
      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
        setTotalCount(data.length);
      } else if (data.orders) {
        setOrders(data.orders);
        setTotalCount(data.total || data.orders.length);
      } else {
        setOrders([]);
        setTotalCount(0);
      }
    } catch (err: any) {
      if (!isSilent) showToast(err.message || 'تعذر تحميل الطلبات', 'error');
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Periodic polling every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && !document.hidden && !actionLoadingId) {
        loadOrders(true);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [loadOrders, actionLoadingId]);

  // Change order status
  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    setActionLoadingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => (o.orderId === orderId || o._id === orderId ? { ...o, status: newStatus as any } : o)));
        showToast('تم تحديث حالة الطلب بنجاح');
      } else {
        showToast('فشل تحديث حالة الطلب', 'error');
      }
    } catch {
      showToast('خطأ في الاتصال بالسيرفر', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Change payment status
  const handleChangePaymentStatus = async (orderId: string, newPaymentStatus: string) => {
    setActionLoadingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => (o.orderId === orderId || o._id === orderId ? { ...o, payment: { ...o.payment, status: newPaymentStatus as any } } : o)));
        showToast('تم تحديث حالة الدفع بنجاح');
      } else {
        showToast('فشل تحديث حالة الدفع', 'error');
      }
    } catch {
      showToast('خطأ في الاتصال بالسيرفر', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete order
  const handleDeleteOrder = async (id: string) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o._id !== id && o.orderId !== id));
        setTotalCount(prev => Math.max(0, prev - 1));
        setConfirmDelete(null);
        showToast('تم حذف الطلب بنجاح');
      } else {
        showToast('فشل حذف الطلب', 'error');
      }
    } catch {
      showToast('خطأ في الاتصال بالسيرفر', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Format currency
  const getOrderTotal = (o: Order) => {
    return o.pricing?.totalSAR ?? o.pricing?.totalLocal ?? o.pricing?.totalEGP ?? 0;
  };

  const getCurrencyLabel = (o: Order) => {
    return o.pricing?.currency === 'EGP' ? 'ج.م' : 'ر.س';
  };

  // Statistics calculation
  const newOrdersCount = orders.filter(o => o.status === 'new').length;
  const paidOrdersCount = orders.filter(o => o.payment?.status === 'paid').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-bold flex items-center gap-2 animate-bounce ${
          toastMessage.type === 'success'
            ? 'bg-emerald-600 text-white border-emerald-500'
            : 'bg-rose-600 text-white border-rose-500'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">إدارة الطلبات والفواتير</h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {totalCount} طلب مسجل
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            متابعة جميع طلبات العملاء (المدفوعة وغير المدفوعة)، إصدار وطباعة الفواتير الرسمية فوراً
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadOrders()}
            disabled={loading}
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl transition shadow-2xs disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-700 ${loading ? 'animate-spin' : ''}`} />
            <span>تحديث البيانات</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-stone-900">{totalCount}</div>
            <div className="text-xs text-stone-500 font-semibold">إجمالي الطلبات</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-700">{newOrdersCount}</div>
            <div className="text-xs text-stone-500 font-semibold">طلبات جديدة بالانتظار</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700">{paidOrdersCount}</div>
            <div className="text-xs text-stone-500 font-semibold">طلبات مدفوعة إلكترونياً</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-purple-700">{deliveredOrdersCount}</div>
            <div className="text-xs text-stone-500 font-semibold">طلبات مكتملة ومسلمة</div>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Filters and Search Bar */}
        <div className="p-4 bg-stone-50/70 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'new', label: 'جديد' },
              { id: 'processing', label: 'قيد التجهيز' },
              { id: 'shipped', label: 'تم الشحن' },
              { id: 'delivered', label: 'مكتمل' },
              { id: 'cancelled', label: 'ملغي' },
            ].map(tab => {
              const active = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                    active
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl pr-10 pl-8 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 transition"
              placeholder="ابحث بالاسم، الجوال، رقم الطلب، الفاتورة..."
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm border-collapse min-w-[1050px]">
            <thead>
              <tr className="bg-stone-100/80 text-stone-700 font-bold border-b border-stone-200 text-xs">
                <th className="py-3.5 px-3 text-center w-12">#</th>
                <th className="py-3.5 px-3">رقم الطلب والفاتورة</th>
                <th className="py-3.5 px-3">العميل والتوصيل</th>
                <th className="py-3.5 px-3">رقم التواصل</th>
                <th className="py-3.5 px-3">نظام الدفع وحالته</th>
                <th className="py-3.5 px-3">الإجمالي</th>
                <th className="py-3.5 px-3">تاريخ الطلب</th>
                <th className="py-3.5 px-3 text-center">حالة الطلب</th>
                <th className="py-3.5 px-3 text-center">الإجراءات والعمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-stone-400">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-7 h-7 animate-spin text-emerald-700" />
                      <span className="text-xs sm:text-sm text-stone-600 font-bold">جاري تحميل وتحديث قائمة الطلبات...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-stone-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-stone-600 font-bold">لا توجد طلبات مطابقة للبحث أو التصفية</span>
                      <p className="text-xs text-stone-400">أي طلب يقدمه العميل سيظهر هنا فوراً مع فاتورته المعتمدة</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((o, idx) => {
                  const statusConf = STATUS_CONFIG[o.status] || STATUS_CONFIG.new;
                  const StatusIcon = statusConf.icon;
                  const paymentConf = PAYMENT_STATUS_CONFIG[o.payment?.status] || PAYMENT_STATUS_CONFIG.pending;
                  const isBusy = actionLoadingId === o._id || actionLoadingId === o.orderId;
                  const total = getOrderTotal(o);
                  const currency = getCurrencyLabel(o);
                  const invoiceNo = o.invoice?.invoiceNumber || `INV-${o.orderId?.slice(-6)}`;
                  const cleanPhone = (o.customer?.phone || '').replace(/\D/g, '');

                  return (
                    <tr key={o._id || o.orderId} className="hover:bg-emerald-50/20 transition-colors">
                      {/* Index */}
                      <td className="py-3.5 px-3 text-center font-mono text-xs text-stone-400">
                        {idx + 1}
                      </td>

                      {/* Order ID & Invoice No */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono font-bold text-stone-900 text-xs sm:text-sm" dir="ltr">
                            {o.orderId}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-bold" dir="ltr">
                              {invoiceNo}
                            </span>
                            <span className="text-[10px] text-stone-400 font-medium">({o.items?.length || 0} صنف)</span>
                          </div>
                        </div>
                      </td>

                      {/* Customer & Location */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-900 text-xs sm:text-sm">
                            {o.customer?.name || 'عميل غير محدد'}
                          </span>
                          <span className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                            <span>{o.customer?.city || 'غير محدد'}</span>
                            {o.customer?.address && (
                              <span className="text-[11px] text-stone-400 truncate max-w-[140px]" title={o.customer.address}>
                                - {o.customer.address}
                              </span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Contact / WhatsApp */}
                      <td className="py-3.5 px-3 whitespace-nowrap" dir="ltr">
                        {cleanPhone ? (
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`مرحباً ${o.customer?.name || 'عميلنا العزيز'}، بخصوص طلبك رقم ${o.orderId} من شركة جرين لاين للأسمدة الزراعية:`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition"
                              title="محادثة واتساب مباشرة"
                            >
                              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{o.customer?.phone}</span>
                            </a>
                          </div>
                        ) : (
                          <span className="text-stone-400 text-xs">—</span>
                        )}
                      </td>

                      {/* Payment Method & Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-xs text-stone-700 font-semibold">
                            {o.payment?.method === 'kashier' ? (
                              <>
                                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                                <span>بطاقة كاشير</span>
                              </>
                            ) : (
                              <>
                                <Banknote className="w-3.5 h-3.5 text-emerald-700" />
                                <span>دفع عند الاستلام</span>
                              </>
                            )}
                          </div>
                          {/* Payment status badge */}
                          <div className="flex items-center gap-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${paymentConf.cls}`}>
                              {paymentConf.label}
                            </span>
                            {/* Quick payment toggle */}
                            {o.payment?.status !== 'paid' ? (
                              <button
                                onClick={() => handleChangePaymentStatus(o._id || o.orderId, 'paid')}
                                className="text-[10px] text-emerald-700 underline font-semibold hover:text-emerald-900"
                                title="تحديد كمدفوع"
                              >
                                تأكيد القبض
                              </button>
                            ) : (
                              <button
                                onClick={() => handleChangePaymentStatus(o._id || o.orderId, 'pending')}
                                className="text-[10px] text-stone-400 underline hover:text-stone-600"
                                title="إعادة إلى معلق"
                              >
                                تعديل
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Total Price */}
                      <td className="py-3.5 px-3 whitespace-nowrap font-black text-stone-900 text-xs sm:text-sm">
                        {total.toLocaleString('ar-SA')} <span className="text-[11px] font-normal text-stone-500">{currency}</span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-xs text-stone-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>
                            {new Date(o.createdAt).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Order Status Selector */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 relative">
                          <select
                            value={o.status}
                            disabled={isBusy}
                            onChange={e => handleChangeStatus(o._id || o.orderId, e.target.value)}
                            className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none transition ${statusConf.badgeCls}`}
                          >
                            <option value="new">جديد (قيد الانتظار)</option>
                            <option value="processing">قيد التجهيز</option>
                            <option value="shipped">تم الشحن</option>
                            <option value="delivered">مكتمل (تم التوصيل)</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {/* Invoice Print Button */}
                          <button
                            onClick={() => window.open(`/admin/orders/${o._id || o.orderId}/print`, '_blank')}
                            className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-2xs active:scale-95"
                            title="طباعة الفاتورة الرسمية"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>فاتورة</span>
                          </button>

                          {/* Order Details Button */}
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition"
                            title="معاينة تفاصيل الطلب"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>تفاصيل</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setConfirmDelete({ id: o._id || o.orderId, name: o.customer?.name || o.orderId })}
                            className="inline-flex items-center text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl">
              <div>
                <h3 className="font-bold text-lg text-stone-900">تفاصيل الطلب #{selectedOrder.orderId}</h3>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  رقم الفاتورة: {selectedOrder.invoice?.invoiceNumber || 'INV-Auto'}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5">
              {/* Customer Box */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <h4 className="font-bold text-xs text-emerald-800 mb-2 border-b border-stone-200 pb-1">بيانات العميل والتوصيل</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div><span className="text-stone-500">الاسم:</span> <strong className="text-stone-800">{selectedOrder.customer?.name}</strong></div>
                  <div><span className="text-stone-500">الجوال:</span> <strong className="text-stone-800" dir="ltr">{selectedOrder.customer?.phone}</strong></div>
                  <div><span className="text-stone-500">المدينة:</span> <strong className="text-stone-800">{selectedOrder.customer?.city}</strong></div>
                  <div><span className="text-stone-500">الدولة:</span> <strong className="text-stone-800">{selectedOrder.customer?.country === 'SA' ? 'المملكة العربية السعودية' : 'جمهورية مصر العربية'}</strong></div>
                  <div className="sm:col-span-2"><span className="text-stone-500">العنوان التفصيلي:</span> <strong className="text-stone-800">{selectedOrder.customer?.address}</strong></div>
                  {selectedOrder.notes && (
                    <div className="sm:col-span-2 bg-amber-50 p-2 rounded border border-amber-200 text-amber-900">
                      <strong>ملاحظات العميل:</strong> {selectedOrder.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 className="font-bold text-xs text-emerald-800 mb-2">المنتجات المطلوبة</h4>
                <div className="border border-stone-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-2.5">اسم المنتج / السماد</th>
                        <th className="p-2.5 text-center">الكمية</th>
                        <th className="p-2.5 text-center">سعر الوحدة</th>
                        <th className="p-2.5 text-center">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {selectedOrder.items?.map((item, i) => (
                        <tr key={i} className="hover:bg-stone-50">
                          <td className="p-2.5 font-bold text-stone-800">
                            {item.name}
                            {item.weight && <span className="text-[11px] text-stone-500 block">({item.weight})</span>}
                          </td>
                          <td className="p-2.5 text-center font-bold">{item.qty}</td>
                          <td className="p-2.5 text-center">{item.price?.toLocaleString('ar-SA')} {getCurrencyLabel(selectedOrder)}</td>
                          <td className="p-2.5 text-center font-bold text-emerald-800">
                            {((item.price || 0) * (item.qty || 1)).toLocaleString('ar-SA')} {getCurrencyLabel(selectedOrder)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-stone-50 border-t border-stone-200 font-bold text-xs">
                      <tr>
                        <td colSpan={3} className="p-2.5 text-left text-stone-700">إجمالي الفاتورة النهائي:</td>
                        <td className="p-2.5 text-center text-sm font-black text-emerald-800">
                          {getOrderTotal(selectedOrder).toLocaleString('ar-SA')} {getCurrencyLabel(selectedOrder)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between rounded-b-2xl">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl text-xs font-bold transition"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  window.open(`/admin/orders/${selectedOrder._id || selectedOrder.orderId}/print`, '_blank');
                }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة الرسمية</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center border border-stone-200">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">تأكيد حذف الطلب</h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف طلب <strong className="text-stone-800">{confirmDelete.name}</strong> نهائياً من قاعدة البيانات؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDeleteOrder(confirmDelete.id)}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                نعم، احذف الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
