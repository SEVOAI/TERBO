
import { Movie } from './types';

export const ADMIN_PASSWORD = '0552860302';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    category: 'Sci-Fi',
    thumbnail: 'https://picsum.photos/seed/interstellar/400/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    rating: 8.7,
    year: 2014
  },
  {
    id: '2',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.',
    category: 'Action',
    thumbnail: 'https://picsum.photos/seed/darkknight/400/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    rating: 9.0,
    year: 2008
  },
  {
    id: '3',
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    category: 'Drama',
    thumbnail: 'https://picsum.photos/seed/parasite/400/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    rating: 8.5,
    year: 2019
  },
  {
    id: '4',
    title: 'Arcane',
    description: 'Amidst the escalating unrest between the rich, utopian city of Piltover and the seedy, oppressed undercity of Zaun.',
    category: 'Animation',
    thumbnail: 'https://picsum.photos/seed/arcane/400/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    rating: 9.1,
    year: 2021
  }
];

export const CATEGORIES = ['Action', 'Drama', 'New Releases', 'Sci-Fi', 'Horror', 'Comedy', 'Animation'] as const;
