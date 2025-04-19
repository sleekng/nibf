"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash, Book, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const emptyFormData = {
  title: "",
  author: "",
  price: "",
  image: null as File | null,
  category: "",
  description: "",
};

const MAX_DESCRIPTION_LENGTH = 150;

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });

  const router = useRouter();

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
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    if (selectedBook) {
      formDataToSend.append('id', selectedBook.id.toString());
      formDataToSend.append('currentImage', selectedBook.image);
    }

    try {
      const url = selectedBook ? `/api/books/${selectedBook.id}` : '/api/books';
      const method = selectedBook ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setFormData({
          title: '',
          author: '',
          price: '',
          image: null,
          category: '',
          description: '',
        });
        setSelectedBook(null);
        await fetchBooks();
        toast.success(selectedBook ? 'Book updated successfully' : 'Book added successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save book');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      image: null,
      category: book.category,
      description: book.description,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (book: Book) => {
    try {
      const response = await fetch(`/api/books/${book.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setIsDeleteDialogOpen(false);
      setSelectedBook(null);
      await fetchBooks();
      toast.success("Book deleted successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete book");
      toast.error("Failed to delete book");
    }
  };

  const openDeleteDialog = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-navy-900">Loading books...</h2>
          <p className="text-slate-600">Please wait while we fetch the books.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-navy-900 hover:bg-slate-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-navy-900">Manage Books</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setFormData(emptyFormData);
              setIsEditing(false);
              setSelectedBook(null);
            }
            setIsDialogOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button className="bg-crimson-500 text-white hover:bg-crimson-600" disabled={isLoading}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Book" : "Add New Book"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₦)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files?.[0] || null })
                    }
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= MAX_DESCRIPTION_LENGTH) {
                        setFormData({ ...formData, description: value });
                      }
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    required
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-sm text-gray-500 text-right">
                    {formData.description.length}/{MAX_DESCRIPTION_LENGTH} characters
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Saving...' : isEditing ? "Update Book" : "Add Book"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                {book.image ? (
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Book className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-slate-600 text-sm mb-1">{book.author}</p>
                <p className="text-slate-600 text-sm mb-4">{book.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-navy-900">
                    ₦{book.price.toLocaleString()}
                  </span>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(book)}
                      disabled={isLoading}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => openDeleteDialog(book)}
                      disabled={isLoading}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the book
              &quot;{selectedBook?.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => selectedBook && handleDelete(selectedBook)}
              disabled={isLoading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 