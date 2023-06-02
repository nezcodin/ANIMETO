import axios from "axios";
import { useState } from "react";
import Image from "next/image";

interface AnimeResult {
  id: number
  title: string
  episodes: number
  status: string
  year: number
  themes: string[]
  studio: string[]
  producers: string[]
  score: number
  scored_by: number
  images: {
    jpg: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
  }
  genres: string[]
  rating: string
  synopsis: string
}

export default function SearchBar() {

  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([])
  const [textSearch, setTextSearch] = useState('')

  const getResults = async () => {
    try {
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime?q=${textSearch}&sfw`)
      setAnimeResults(data.data)
    } catch (error) {
      console.log('There was an error! SearchBar.tsx')
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getResults();
  };

  console.log(animeResults)

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            placeholder="What do you want to search?"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />
          <button
            type="submit"
          >Search</button>
        </form>
      </div>
      {animeResults.length > 0 ? (
        animeResults.map((animeResult) => (
          <div key={animeResult.id}>
            <Image
              width={200}
              height={300}
              src={animeResult.images.jpg.large_image_url}
              alt="anime-poster"
            />
            <p>{animeResult.title}</p>
          </div>
        ))
      ) : (
        <div>
          <p>Hm, there doesn&apos;t seem to be any results. Try searching for something else.</p>
        </div>
      )}
    </div>
  )

}

