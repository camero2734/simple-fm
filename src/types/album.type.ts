import type { ImageType, ObjArray } from '~/index.js';

export declare interface AlbumGetInfoType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats?: {
    userPlayCount?: number | null;
  };
  tags: Array<{
    name: string;
    url: string;
  }>;
  tracks: ObjArray<{
    rank: number;
    name: string;
    duration: number | null;
    url: string;
  }>;
  url: string;
  image: ImageType[] | null;
}

export declare interface AlbumGetTopTagsType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  tags: Array<{
    count: number;
    name: string;
    url: string;
  }>;
}

export declare interface AlbumSearchType {
  search: {
    query: string;
    page: number;
    itemsPerPage: number;
    totalResults: number;
  };
  albums: Array<{
    name: string;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image: ImageType[] | null;
  }>;
}
