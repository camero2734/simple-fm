import { convertImageSizes, convertURL } from '@utils/convert.js';
import Base from '~/base.js';

import type { AlbumGetInfoParams, AlbumGetTopTagsParams, AlbumSearchParams } from '@params/index.js';
import type {
  AlbumGetInfoResponse,
  AlbumGetTopTagsResponse,
  AlbumSearchResponse,
  TrackResponse,
} from '@responses/index.js';
import type { AlbumGetInfoType, AlbumGetTopTagsType, AlbumSearchType } from '@typings/index.js';

export default class Album extends Base {
  /**
   * Returns metadata information for an artist.
   * @param artist - The name of the artist.
   * @param album - The name of the album.
   * @param username - The username for the context of the request. If supplied, the user's playcount for this artist's album is included in the response.
   */
  async getInfo(params: AlbumGetInfoParams): Promise<AlbumGetInfoType> {
    const {
      album,
      album: {
        tracks: { track },
        tags: { tag },
      },
    } = await this.sendRequest<AlbumGetInfoResponse>({
      method: 'album.getInfo',
      artist: params.artist,
      album: params.album,
      username: params.username,
    });

    const returnTrack = (track: TrackResponse) => ({
      rank: Number(track['@attr'].rank),
      name: track.name,
      duration: Number(track.duration) || null,
      url: track.url,
    });

    return {
      name: album.name,
      mbid: album.mbid,
      artist: {
        name: album.artist,
        url: `https://www.last.fm/music/${convertURL(album.artist)}`,
      },
      stats: {
        scrobbles: Number(album.playcount),
        listeners: Number(album.listeners),
      },
      userStats: {
        userPlayCount: (params.username && Number(album.userplaycount)) || null,
      },
      tags: tag.map((t) => ({
        name: t.name,
        url: t.url,
      })),
      tracks: Array.isArray(track) ? track.map((t) => returnTrack(t)) : returnTrack(track),
      url: album.url,
      image: convertImageSizes(album.image) || null,
    };
  }

  /**
   * Returns popular tags for an album.
   * @param artist - The name of the artist.
   * @param album - The name of the album.
   */
  async getTopTags(params: AlbumGetTopTagsParams): Promise<AlbumGetTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await this.sendRequest<AlbumGetTopTagsResponse>({
      method: 'album.getTopTags',
      artist: params.artist,
      album: params.album,
    });

    return {
      name: attr.album,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      tags: tag.map((t) => ({
        count: t.count,
        name: t.name,
        url: t.url,
      })),
    };
  }

  /**
   * Search for an album by name.
   * @param album - The name of the album.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(params: AlbumSearchParams): Promise<AlbumSearchType> {
    const {
      results,
      results: {
        albummatches: { album },
      },
    } = await this.sendRequest<AlbumSearchResponse>({
      method: 'album.search',
      album: params.album,
      limit: params.limit ?? 30,
      page: params.page ?? 1,
    });

    return {
      search: {
        query: results['opensearch:Query'].searchTerms,
        page: Number(results['opensearch:Query'].startPage),
        itemsPerPage: Number(results['opensearch:itemsPerPage']),
        totalResults: Number(results['opensearch:totalResults']),
      },
      albums: album.map((a) => ({
        name: a.name,
        mbid: a.mbid,
        artist: {
          name: a.artist,
          url: `https://www.last.fm/music/${convertURL(a.artist)}`,
        },
        url: a.url,
        image: convertImageSizes(album.image),
      })),
    };
  }
}
