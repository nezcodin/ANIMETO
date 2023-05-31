import axios from "axios";
import { useEffect, useState } from "react";

interface AnimeResult {
  title: string
  episodes: number
}

export default function SearchBar() {

  const [animeData, setAnimeData] = useState<AnimeResult[]>([])

  useEffect(() => {
    const getResults = async () => {
      try {
        const { data } = await axios.get('https://api.jikan.moe/v4/anime?q=naruto&sfw')
        console.log(data)
        setAnimeData(data)
      } catch (error) {
        console.log('There was an error! SearchBar.tsx')
      }
    }
    getResults()
  }, [])

  return (
    <div></div>
  )

}