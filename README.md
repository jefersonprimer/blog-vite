# 📝 PrimerDev's Static Blog

This is a minimalist, responsive, markdown-powered blog built using **React**, **Tailwind CSS**, and **TypeScript**. It follows clean code practices inspired by **Clean Architecture**, **SOLID**, and **DDD** principles.

---

## 🌍 Multilingual Blog

Each blog post supports two versions:

- `pt-br`: Portuguese (Brazil)
- `en`: English

Posts are stored in Markdown format inside the `client/src/posts/` folder with the following structure:

```
client/src/posts/
├── post-id/
│   ├── en.md
│   └── pt-br.md
```

The language selector on the UI lets users toggle between languages dynamically.

---

## 🌗 Dark / Light Theme

A theme toggle button allows switching between light and dark modes using `localStorage`.  
The CSS is written with both themes supported and toggled via a class on the HTML element.

---

## 📁 Project Structure

```
├── client/                 # Frontend code
│   ├── index.html          # Main HTML file
│   └── src/
│       ├── components/     # React components
│       ├── data/           # Static data (posts.json)
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utility functions
│       ├── pages/          # Page components
│       ├── posts/          # Markdown blog posts
│       └── types/          # TypeScript interfaces
├── server/                 # Backend code
│   ├── index.ts            # Server entry point
│   └── routes.ts           # API routes
└── shared/                 # Shared code between frontend and backend
    └── schema.ts           # Data models
```

---

## 🧠 Architecture & Principles

- **Clean Architecture** (adapted for a React application)
- **SOLID** principles in component design
- **DDD mindset**: Markdown posts as entities, JSON as repository
- **Responsive design**: Mobile-first approach
- **Multilingual support**: English and Portuguese
- **Theme switching**: Light and dark mode

---

## 🗂️ Posts Data Format

Blog posts metadata is stored in `client/src/data/posts.json`:

```json
[
  {
    "id": "post-id",
    "title": {
      "en": "English Post Title",
      "pt-br": "Título do Post em Português"
    },
    "date": "YYYY-MM-DD",
    "tags": ["tag1", "tag2"],
    "coverImage": "https://image-url.jpg",
    "description": {
      "en": "English description",
      "pt-br": "Descrição em Português"
    },
    "folder": "post-id"
  }
]
```

---

## 🔍 Features

✅ Responsive design (mobile-first)

✅ Dark/Light theme toggle

✅ Language switcher (pt-br / en)

✅ Markdown posts

✅ JSON metadata

✅ Filters by title and tag

✅ Custom 404 page

✅ Clean separation between data and UI

---

## 🚀 Local Installation

To run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/primer-dev-blog.git
   cd primer-dev-blog
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5000
   ```

---

## 👨‍💻 Author

Built with ❤️ by @jefersonprimer

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.