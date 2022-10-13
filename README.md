# Tizen App

A Smart TV web application demo built for the Tizen platform.

## Run

NPM and Tizen CLI required.

1. Connect testing device and configure certificate.
2. Set device IP in `package.json`.
3. `npm install`.
4. `npm run build`.

## Debug

WITS required ([NPM package](https://www.npmjs.com/package/@tizentv/wits)).

1. Connect testing device and configure certificate.
2. Set device and host IP and certificate profile path in `.witsconfig.json`.
3. `npm run start-wits`.

# Todo

- Logout
- TTS on headings
- OOP
- AVplay buffering

# Resources

- [JavaScript SpatialNavigation](https://github.com/luke-chang/js-spatial-navigation) by Luke Chang
- [Webpack](https://webpack.js.org/) bundler for ES6 compatibility
- [WITS](https://github.com/Samsung/Wits/) for debugging Samsung Smart TV applications.
