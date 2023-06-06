import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from '@iconify/react';
import Link from "next/link";
import { AnimeResult, Genre } from "../types/types"
import Filter from "./Filter";

export default function SearchBar() {

  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([])
  const [textSearch, setTextSearch] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)


  https://api.jikan.moe/v4/genres/anime

  // useEffect(() => {
  //   getResults()
  // }, [textSearch, selectedGenres])

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await axios.get<{ genres: Genre[] }>('https://api.jikan.moe/v4/genres/anime')
        console.log(data)
        setGenres(data.data)
      } catch (error) {
        console.log('There was an issue fetching genres.')
      }
    }

    getGenres()
  }, [])

  const getResults = async () => {
    try {
      const genreQuery = selectedGenres.length > 0 ? `&genre=${selectedGenres.join(',')}` : ''
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime?q=${textSearch}&sfw`)
      setAnimeResults(data.data)
    } catch (error) {
      console.log('There was an error! SearchBar.tsx')
    }
  }

  const handleGenreChange = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getResults();
  };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTextSearch(e.target.value)
  // }

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      setIsMobile(screenWidth < 1024)
    };

    handleResize(); // Check initial screen width

    // Update screen width on component updates
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);
  // keeping the dependency array empty otherwise there is potential for too many requests per second to happen and result in improper search results

  return (
    <div
      className="flex flex-col justify-center items-center p-5 font-oswaldlight text-lg"
    >
      <div>
        <form
          onSubmit={handleSearch}
          className="p-5 flex justify-center items-center mb-5"
        >
          <input
            placeholder="What do you want to search?"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            className="bg-containerBg text-containerText placeholder-containerTop rounded-3xl p-2 mr-3 outline-none pl-3 max-sm:w-52 md:w-96"
          />
          <button
            type="submit"
            className="text-buttonText"
          >
            <Icon
              icon="iconamoon:search-light"
              className="text-4xl"
            />
          </button>
        </form>
      </div>
      <Filter
        genres={genres}
        selectedGenres={selectedGenres}
        handleGenreChange={handleGenreChange}
      />
      {animeResults.length > 0 ? (
        animeResults.map((animeResult) => (
          <div
            key={animeResult.mal_id}
            className="p-8 mb-10 bg-containerBg text-lg w-11/12"
          >
            {isMobile ? (
              <div>
                <div
                  className="mb-5 flex justify-center items-center xxs:flex-col md:flex-row"
                >
                  <Image
                    width={200}
                    height={300}
                    src={animeResult.images.jpg.large_image_url}
                    alt="anime-poster"
                    className="flex justify-center items-center"
                  />
                  <div
                    className="flex flex-col justify-center items-center text-center p-3"
                  >
                    <p
                      className="font-bebasneue text-2xl p-2"
                    >{animeResult.title}</p>
                    <p
                      className="p-2"
                    >Episodes: {animeResult.episodes}</p>
                    <p
                      className="p-2"
                    >{animeResult.status}</p>
                  </div>
                </div>
                <p
                  className="line-clamp-5"
                >Synopsis: {animeResult.synopsis}</p>
                <Link
                  href={`/results/${animeResult.mal_id}`}
                  className="text-buttonText decoration underline flex justify-end mt-4"
                >Read More...</Link>
              </div>
            ) : (
              <div>
                <Image
                  width={200}
                  height={300}
                  src={animeResult.images.jpg.large_image_url}
                  alt="anime-poster"
                />
                <p>{animeResult.title}</p>
                <p>Episodes: {animeResult.episodes}</p>
                <p>Released: {animeResult.year}</p>
                <p>{animeResult.status}</p>
                <p>{animeResult.scored_by} fans rated this a {animeResult.score}!</p>
                <p>Synopsis: {animeResult.synopsis}</p>
              </div>
            )}

          </div>
        ))
      ) : (
        <div>
          <p className="text-containerText text-center mt-10">Hm, there doesn&apos;t seem to be any results. Try searching for something else.</p>
        </div>
      )}
    </div>
  )
}
