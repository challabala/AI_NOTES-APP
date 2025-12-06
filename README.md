# AI Study Assistant

A complete AI-powered Study Assistant web app using the MERN stack.

## Tech Stack
- **Frontend**: React (Vite) + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas + Mongoose
- **Auth**: JWT (access + refresh tokens), bcrypt
- **AI**: Integration with LLMs (OpenAI/Gemini/etc)

## Features
- **Notes**: Create, edit, and organize notes.
- **AI Summary**: Generate summaries (short & bullet points) for notes.
- **AI Flashcards**: Generate Q&A flashcards from notes.
- **Quiz**: Self-paced quiz using generated flashcards.

## Folder Structure

```
/ai-study-assistant
  /backend
    /config
    /controllers
    /middleware
    /models
    /routes
    /services
    server.js
  /frontend
    /src
      /assets
      /components
      /features (redux slices)
      /pages
      /hooks
      /services (api)
    App.jsx
    main.jsx
```

## Setup
(See Deployment Guide)
