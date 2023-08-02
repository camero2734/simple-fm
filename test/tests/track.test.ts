import { describe, expect, it } from 'vitest';

import { ENV } from '../env.js';
import {
  TrackGetInfoSchema,
  TrackGetSimilarSchema,
  TrackGetTopTagsSchema,
  TrackSearchSchema,
} from '../schemas/track.schema.js';

import simpleFM from '~/index.js';

const client = new simpleFM(ENV.LASTFM_TOKEN);

describe('Track', () => {
  describe('getInfo', () => {
    it('Should return info for a track', async () => {
      const data = await client.track.getInfo({ artist: 'Lyn', track: 'Take Over' });

      expect(() => TrackGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the track doesn't exist", async () => {
      try {
        const data = await client.track.getInfo({ artist: 'mrrowk[rpgk', track: '=-ks0-[hkt0phj' });

        expect(() => TrackGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('Track not found');
      }
    });
  });

  describe('getSimilar', () => {
    it('Should return similar tracks from a query', async () => {
      const data = await client.track.getSimilar({ artist: 'Metallica', track: 'Sad But True' });

      expect(() => TrackGetSimilarSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the track doesn't exist", async () => {
      try {
        const data = await client.track.getSimilar({ artist: 'mrrowk[rpgk', track: '=-ks0-[hkt0phj' });

        expect(() => TrackGetSimilarSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('Track not found');
      }
    });
  });

  describe('getTopTags', () => {
    it("Should return a track's top tags", async () => {
      const data = await client.track.getTopTags({ artist: 'Taylor Swift', track: 'New Romantics' });

      expect(() => TrackGetTopTagsSchema.parse(data.tags)).not.toThrow();
    });

    it("Should error when the track doesn't exist", async () => {
      try {
        const data = await client.track.getTopTags({ artist: 'mrrowk[rpgk', track: '=-ks0-[hkt0phj' });

        expect(() => TrackGetTopTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('Track not found');
      }
    });
  });

  describe('search', () => {
    it('Should search and return tracks for a query', async () => {
      const data = await client.track.search({ track: "Ain't It Fun" });

      expect(() => TrackSearchSchema.parse(data.tracks)).not.toThrow();
    });
  });
});
