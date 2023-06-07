import { Genre } from "@/types/types";
import React from "react";

interface FilterProps {
  genres: Genre[];
  selectedGenres: number[];
  handleGenreChange: (genreId: number) => void;
}

export default function Filter({ genres, selectedGenres, handleGenreChange }: FilterProps) {
  const handleCheckboxChange = (genreId: number) => {
    const updatedGenres = [...selectedGenres];
    if (updatedGenres.includes(genreId)) {
      const index = updatedGenres.indexOf(genreId);
      updatedGenres.splice(index, 1);
    } else {
      updatedGenres.push(genreId);
    }
    handleGenreChange(updatedGenres);
  };

  return (
    <div className="bg-pink-200">
      {genres.map((genre) => (
        <label key={genre.id}>
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre.id)}
            onChange={() => handleCheckboxChange(genre.id)}
          />
          {genre.name}
        </label>
      ))}
    </div>
  );
}
