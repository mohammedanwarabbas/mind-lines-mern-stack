<h1 align="center">Welcome to mind lines 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/mind lines" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/mind lines.svg">
  </a>
</p>

> It is a mernstack project that allows writers to register and publish their quotes so public can view it


## File Structure
<pre>
.
├── mind-lines-backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── guestController.js
│   │   └── writerController.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Quote.js
│   │   └── User.js
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── guestRoutes.js
│   │   └── writerRoutes.js
│   ├── scripts
│   │   └── seedAdmin.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── mind-lines-frontend
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── assets
│   │   │   ├── fonts
│   │   │   ├── images
│   │   │   ├── styles
│   │   │   │   ├── global.css
│   │   │   │   └── theme.js
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── common
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── QuoteEditorModal.jsx
│   │   │   ├── layout
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   └── ui
│   │   │       └── Loader.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── AllQuotes.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── WritersList.jsx
│   │   │   ├── auth
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── UpdateProfile.jsx
│   │   │   ├── common
│   │   │   │   ├── NotFound.jsx
│   │   │   │   └── Unauthorized.jsx
│   │   │   ├── home
│   │   │   │   └── Home.jsx
│   │   │   └── writer
│   │   │       ├── Dashboard.jsx
│   │   │       ├── MyQuotes.jsx
│   │   │       └── WriteQuote.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── config.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
└── README.md

26 directories, 51 files
</pre>

## Author

👤 **mohammed anwar**

* Github: [@mohammedanwarabbas](https://github.com/mohammedanwarabbas)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_