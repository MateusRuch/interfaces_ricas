import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  publicationDate: string;
  rating: number;
  isRead: boolean;
}

interface BookForm {
  title: string;
  author: string;
  pages: number;
  publicationDate: string;
  rating: number;
  isRead: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  books: Book[] = [
    {
      id: 1,
      title: 'O Hobbit',
      author: 'J. R. R. Tolkien',
      pages: 310,
      publicationDate: '1937-09-21',
      rating: 5,
      isRead: true,
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      pages: 288,
      publicationDate: '1949-06-08',
      rating: 4,
      isRead: true,
    },
    {
      id: 3,
      title: 'A Revolução dos Bichos',
      author: 'George Orwell',
      pages: 152,
      publicationDate: '1945-08-17',
      rating: 4,
      isRead: false,
    },
  ];

  selectedBook: Book | null = this.books[0];
  editingId: number | null = null;
  bookForm: BookForm = this.createForm();

  get totalLivros(): number {
    return this.books.length;
  }

  get livrosLidos(): number {
    return this.books.filter((book) => book.isRead).length;
  }

  get avaliacaoMedia(): number {
    if (this.books.length === 0) {
      return 0;
    }

    const total = this.books.reduce((sum, book) => sum + book.rating, 0);
    return total / this.books.length;
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
    this.editingId = book.id;
    this.bookForm = {
      title: book.title,
      author: book.author,
      pages: book.pages,
      publicationDate: book.publicationDate,
      rating: book.rating,
      isRead: book.isRead,
    };
  }

  saveBook(): void {
    const title = this.bookForm.title.trim();
    const author = this.bookForm.author.trim();

    if (!title || !author) {
      return;
    }

    const payload: Book = {
      id: this.editingId ?? this.getNextId(),
      title,
      author,
      pages: Number(this.bookForm.pages) || 0,
      publicationDate: this.bookForm.publicationDate,
      rating: Number(this.bookForm.rating) || 1,
      isRead: this.bookForm.isRead,
    };

    if (this.editingId !== null) {
      this.books = this.books.map((book) => (book.id === this.editingId ? payload : book));
      this.selectedBook = payload;
    } else {
      this.books = [payload, ...this.books];
      this.selectedBook = payload;
    }

    this.resetForm();
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((book) => book.id !== id);

    if (this.selectedBook?.id === id) {
      this.selectedBook = this.books[0] ?? null;
    }

    if (this.editingId === id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.bookForm = this.createForm();
    this.editingId = null;
  }

  private createForm(): BookForm {
    return {
      title: '',
      author: '',
      pages: 0,
      publicationDate: '',
      rating: 4,
      isRead: false,
    };
  }

  private getNextId(): number {
    return this.books.reduce((max, book) => Math.max(max, book.id), 0) + 1;
  }
}
