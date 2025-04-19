"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, Plus, Minus, Book, ChevronLeft, ChevronRight, Building2, Mail, Phone, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  AnimatedHeading,
  AnimatedText,
} from "@/components/animated-section";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface SelectedBook {
  id: number;
  quantity: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface DonorInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  isOrganization: boolean;
}

export default function BookDonations() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<SelectedBook[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    isOrganization: false,
  });

  useEffect(() => {
    fetchBooks();
  }, [pagination.page]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`/api/books?page=${pagination.page}&limit=${pagination.limit}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookSelection = (bookId: number) => {
    setSelectedBooks((prev) =>
      prev.some((item) => item.id === bookId)
        ? prev.filter((item) => item.id !== bookId)
        : [...prev, { id: bookId, quantity: 1 }]
    );
  };

  const updateQuantity = (bookId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedBooks((prev) =>
      prev.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const selectedBooksData = books.filter((book) =>
    selectedBooks.some((item) => item.id === book.id)
  );

  const totalAmount = selectedBooks.reduce(
    (sum, item) => {
      const book = books.find((b) => b.id === item.id);
      return sum + (book?.price || 0) * item.quantity;
    },
    0
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleProceedToPayment = async () => {
    if (selectedBooks.length === 0) {
      toast.error('Please select at least one book');
      return;
    }

    setShowDonorForm(true);
  };

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donor: donorInfo,
          items: selectedBooks.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: books.find(b => b.id === item.id)?.price,
          })),
          amount: totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }

      const data = await response.json();
      
      // Redirect to Paystack payment page
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process payment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-navy-900">Loading books...</h2>
          <p className="text-slate-600">Please wait while we fetch the available books.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error</h2>
          <p className="text-slate-600">{error}</p>
          <Button
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/event/5.jpg"
          alt="Book Donation Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto max-w-6xl px-4 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Support Education Through Book Donations
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-200">
              Join us in our mission to provide quality educational materials to schools across Lagos State.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-navy-900 hover:bg-slate-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="relative border-navy-900 text-navy-900 hover:bg-slate-100"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart ({selectedBooks.length})
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Book List */}
          <div className="md:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              {books.map((book) => {
                const selectedItem = selectedBooks.find((item) => item.id === book.id);
                return (
                  <motion.div
                    key={book.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all ${
                      selectedItem ? "ring-2 ring-crimson-500" : ""
                    }`}
                  >
                    <div className="relative h-[320px] w-full mb-4">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-navy-900">
                        {book.title}
                      </h3>
                      <p className="text-sm text-slate-600">{book.author}</p>
                      <p className="text-sm text-slate-600">{book.category}</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-gray-700 mb-4 line-clamp-2">
                              {book.description}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{book.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-navy-900">
                          ₦{book.price.toLocaleString()}
                        </span>
                        {selectedItem ? (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(book.id, selectedItem.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{selectedItem.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(book.id, selectedItem.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => toggleBookSelection(book.id)}
                          >
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Cart Summary */}
          <div
            className={`sticky top-32 h-fit rounded-lg bg-white p-6 shadow-lg ${
              showCart ? "block" : "hidden md:block"
            }`}
          >
            <h3 className="mb-6 text-2xl font-bold text-navy-900">
              Donation Summary
            </h3>
            {selectedBooks.length === 0 ? (
              <p className="text-slate-600">No books selected yet</p>
            ) : (
              <>
                <div className="space-y-4">
                  {selectedBooks.map((item) => {
                    const book = books.find((b) => b.id === item.id);
                    if (!book) return null;
                    return (
                      <div
                        key={book.id}
                        className="flex items-center justify-between border-b border-slate-200 pb-4"
                      >
                        <div>
                          <p className="font-medium text-navy-900">{book.title}</p>
                          <p className="text-sm text-slate-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-navy-900">
                          ₦{(book.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold text-navy-900">Total</span>
                    <span className="font-bold text-navy-900">
                      ₦{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <Button className="w-full bg-crimson-500 text-white hover:bg-crimson-600 py-6 text-lg" onClick={handleProceedToPayment}>
                    Proceed to Payment
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-md bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    pageNum === pagination.page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-md bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Enhanced Donor Information Form */}
        {showDonorForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative">

              
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 p-6 text-white relative">
                              {/* Background Image */}
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="/images/event/5.jpg"
                  alt="Book Donation Background"
                  fill
                  className="object-cover"
                />
              </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Donor Information</h2>
                  <button
                    onClick={() => setShowDonorForm(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-indigo-100 mt-2">Please provide your details to proceed with the donation</p>
              </div>

              {/* Form */}
              <form onSubmit={handleDonorSubmit} className="p-6 space-y-6 relative">
                {/* Donor Type Toggle */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setDonorInfo({ ...donorInfo, isOrganization: false })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      !donorInfo.isOrganization
                        ? 'bg-indigo-100 text-indigo-700 shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonorInfo({ ...donorInfo, isOrganization: true })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      donorInfo.isOrganization
                        ? 'bg-indigo-100 text-indigo-700 shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Building2 className="h-5 w-5" />
                    Organization
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      {donorInfo.isOrganization ? (
                        <>
                          <Building2 className="h-4 w-4 text-indigo-600" />
                          Organization Name
                        </>
                      ) : (
                        <>
                          <User className="h-4 w-4 text-indigo-600" />
                          Full Name
                        </>
                      )}
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white/80 backdrop-blur-sm"
                      placeholder={donorInfo.isOrganization ? "Enter organization name" : "Enter your full name"}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-indigo-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white/80 backdrop-blur-sm"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-indigo-600" />
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white/80 backdrop-blur-sm"
                      placeholder="Enter contact number"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                      {donorInfo.isOrganization ? "Organization Address" : "Address"}
                    </label>
                    <textarea
                      value={donorInfo.address}
                      onChange={(e) => setDonorInfo({ ...donorInfo, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white/80 backdrop-blur-sm"
                      rows={3}
                      placeholder={donorInfo.isOrganization ? "Enter organization address" : "Enter your address"}
                    />
                  </div>
                </div>

                {/* Donation Summary */}
                <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Donation Summary</h3>
          
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total Amount</span>
                      <span>₦{totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDonorForm(false)}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 