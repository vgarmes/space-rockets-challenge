![Drawing of a rocket launching with Pleo logo on the side](https://repository-images.githubusercontent.com/255552950/c9991080-ff11-11ea-8706-5d40322f68fe)

# ¡Space·Rockets! app

### [🚀 See the NEW app in action 🚀](https://new-space-rockets.netlify.app)

## New features and fixes

- Launch date is displayed in local time. A tooltip shows the launch date in user's time.
- Favorites: user can add launches and launch pads to a favorite list. The list is stored locally.
- Filter: user can filter launches by launch success, date range and launch site.
- Grid/List view: user can toggle betwen a grid view and a list view on the launches list.
- Sort: user can sort the launches list by mission name, launch date, launch site and rocket name.
- Animations: the list of Launch and launch pad items is displayed with a fade animation on user scroll.

## Develop

> You'll need [Node](https://nodejs.org/en/) and
> [Yarn](https://classic.yarnpkg.com/en/) installed

- run `yarn` to install dependencies
- run `yarn start` to start development environment

## Build

> You'll need [Node](https://nodejs.org/en/) and
> [Yarn](https://classic.yarnpkg.com/en/) installed

- run `yarn` to install dependencies
- run `yarn build` to build app for production
- output is in `build` directory,
  [ready to be deployed](https://create-react-app.dev/docs/deployment/)

## Test

- run `yarn test`to test app

## Data

All data is fetched from the unofficial SpaceX API V3 at
[spacexdata.com](https://docs.spacexdata.com/?version=latest).

## Technologies

> This project was bootstrapped with
> [Create React App](https://github.com/facebook/create-react-app). You can
> learn more in the
> [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- [React](https://reactjs.org/) - UI library
- [Chakra UI](https://chakra-ui.com/) - Design system and component library,
  with [Emotion](https://emotion.sh), its peer dependency
- [SWR](https://swr.now.sh/) - Data fetching and caching library
- [React Router v6](https://github.com/ReactTraining/react-router/blob/f59ee5488bc343cf3c957b7e0cc395ef5eb572d2/docs/installation/getting-started.md) -
  routing library
- [React Feathers](https://github.com/feathericons/react-feather) - Icons
  ([Feather icons](https://feathericons.com/) wrapper for React)
- [React Icons](https://react-icons.github.io/react-icons/) - More icons
- [timeago.js](https://timeago.org/) - Tiny library to display human-readable
  relative time difference
- [luxon](https://moment.github.io/luxon) - Wrapper for JavaScript dates and times
- [React Reveal](https://www.react-reveal.com/) - Animation framework

## Dev dependencies

- [Testing Library](https://testing-library.com/) - Testing utilities
- [React Test Renderer](https://reactjs.org/docs/test-renderer.html) - React renderer used for snapshotting during tests with Jest
- [Snapshot Diff](https://github.com/jest-community/snapshot-diff) - Jest utility that takes two snapshots and returns the difference
