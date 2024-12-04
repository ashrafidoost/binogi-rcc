import React, { createContext, useState, useContext } from "react";
import { Recipe } from "../types/RecipeTypes";

interface BookmarkContextType {
  bookmarks: Recipe[];
  addBookmark: (recipe: Recipe) => void;
  removeBookmark: (recipe: Recipe) => void;
}

// The context type
const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

// Hook to access bookmark context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

// The type for BookmarkProvider props
interface BookmarkProviderProps {
  children: React.ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Recipe[]>(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const addBookmark = (recipe: Recipe) => {
    setBookmarks((prevBookmarks) => {
      const newBookmarks = [...prevBookmarks, recipe];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const removeBookmark = (recipe: Recipe) => {
    setBookmarks((prevBookmarks) => {
      const newBookmarks = prevBookmarks.filter(
        (item) => item.uri !== recipe.uri
      );
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
