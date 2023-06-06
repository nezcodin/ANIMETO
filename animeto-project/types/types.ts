export interface AnimeResult {
  id: number
  mal_id: number
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

export interface Genre {
  id: number
  name: string
}
