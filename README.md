<div align="center">

<a href="https://simple.arciniega.one" title="simple.arciniega.one">
    <img
      src="public/logo.svg"
      height="100"
      weight="100"
      alt="Headphones with musical notes coming out of it."
      title="Headphones with musical notes coming out of it."
    />
</a>

## simple-fm

_A simple, asynchronous Last.fm wrapper in TypeScript._

Search for what someone has been listening to lately, what tracks are trending in a country, an artist's top tracks, and
a lot more.

For more information, please visit the [documentation website][docs].

[![CI][actions-image]][actions-link] [![npm-image]][npm-link] [![downloads-image]][npm-link] [![license-image]][license]

</div>

# Install

`simple-fm` requires that you have **Node.js 18** (and above) and **TypeScript v5+** installed.

- npm: `npm i @solely/simple-fm`
- pnpm: `pnpm i @solely/simple-fm`
- yarn: `yarn add @solely/simple-fm`
- bun: `bun i @solely/simple-fm`

# Notice

`simple-fm` requires you to have a Last.fm API key.

To obtain a Last.fm API key, click [here to register an API account][last-fm-api].

# Example usage

```ts
// Import the simple-fm package.
import SimpleFM from '@solely/simple-fm'; // ESM
const SimpleFM = require('@solely/simple-fm'); // CommonJS

// Replace the token with your Last.fm API key.
const client = new SimpleFM('Last.fm API key');

// Fetch the recent track from a user.
const json = await client.user.getRecentTracks({ user: 'solelychloe' });

console.log(json);
// => { search: { user: 'solelychloe', nowPlaying: true, ... }, tracks: [...] }
```

If you're using [Deno][deno-repo], you can import `simple-fm` via a CDN:

```ts
import SimpleFM from 'https://esm.sh/@solely/simple-fm';
```

# License

This package is licensed under the [zlib][license] license.

© 2023 Chloe Arciniega.

[actions-image]:
  https://img.shields.io/github/actions/workflow/status/solelychloe/simple-fm/main.yml?colorA=18181B&colorB=de3931
[actions-link]: https://github.com/solelychloe/simple-fm/actions/workflows/main.yml
[deno-repo]: https://github.com/denoland/deno
[docs]: https://simple.arciniega.one
[logo]: /public/logo.svg 'The Twitter headphone emoji with musical notes in it.'
[license]: /LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[last-fm-api]: https://www.last.fm/api/account/create
[license-image]: https://img.shields.io/npm/l/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-image]: https://img.shields.io/npm/v/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-link]: https://npmjs.org/package/@solely/simple-fm
