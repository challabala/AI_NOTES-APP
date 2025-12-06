# Deployment Guide for AI Study Assistant

This guide covers deploying the MERN stack application to **Render** (Backend) and **Vercel** (Frontend).

## Prerequisites

1.  **GitHub Account**: You must be able to push your code to a GitHub repository.
2.  **Render Account**: For backend hosting ([render.com](https://render.com/)).
3.  **Vercel Account**: For frontend hosting ([vercel.com](https://vercel.com/)).
4.  **MongoDB Atlas Account**: You should already have this set up.

---

## 1. Prepare for Deployment

### A. Root Directory Check
Ensure your project has two distinct folders:
- `backend/`
- `frontend/`

### B. Environment Variables
You will need your secrets handy:
- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `AI_API_KEY` (OpenAI or similar)

---

## 2. Deploy Backend (Render)

1.  **Push Code to GitHub**:
    ```bash
    git add .
    git commit -m "Ready for deploy"
    git push origin main
    ```

2.  **Create Service on Render**:
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository.
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Node through `package.json` logic, or explicitly select **Node**.
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`

3.  **Environment Variables**:
    *   Go to the **Environment** tab in Render.
    *   Add the following variables:
        *   `NODE_ENV`: `production`
        *   `MONGO_URI`: `(Your MongoDB Connection String)`
        *   `JWT_ACCESS_SECRET`: `(A long random string)`
        *   `JWT_REFRESH_SECRET`: `(Another long random string)`
        *   `AI_API_KEY`: `(Your OpenAI Key)`
        *   `CLIENT_URL`: `https://your-project-name.vercel.app` (You will update this *after* frontend deploy, or guess it now).

4.  **Deploy**:
    *   Click **Create Web Service**.
    *   Wait for the "Live" badge.
    *   Copy your backend URL (e.g., `https://ai-study-backend.onrender.com`).

---

## 3. Deploy Frontend (Vercel)

1.  **Import Project in Vercel**:
    *   Go to Vercel Dashboard -> **Add New...** -> **Project**.
    *   Select your GitHub repository.

2.  **Configure Project**:
    *   **Framework Preset**: Vite (should auto-detect).
    *   **Root Directory**: Click "Edit" and select `frontend`.

3.  **Environment Variables**:
    *   Expand **Environment Variables**.
    *   Key: `VITE_API_URL`
    *   Value: `https://ai-study-backend.onrender.com/api` (The Render URL + /api)

4.  **Deploy**:
    *   Click **Deploy**.
    *   Wait for completion.

---

## 4. Final Connection Step (IMPORTANT)

1.  Copy your new **Vercel Frontend URL** (e.g., `https://ai-study-frontend.vercel.app`).
2.  Go back to **Render** -> Dashboard -> Select Backend Service -> **Environment**.
3.  Update (or add) `CLIENT_URL` to match your Vercel URL exactly.
4.  **Save Changes** (Render will automatically redeploy).

---

## 5. Verify Deployment

1.  Open your Vercel URL.
2.  **Register a new user**.
3.  **Create a Note**.
4.  **Generate Summary/Flashcards**.
    *   *Note: If you didn't add a paid OpenAI key, the app will use the "Heuristic Fallback" mode and still generate content based on your note text.*

## Troubleshooting

*   **CORS Error**: Ensure `CLIENT_URL` in Render matches your Vercel URL exactly (no trailing slash usually, but check browser console).
*   **Build Failures**: Check the logs on Render/Vercel. Ensure you included `backend` and `frontend` folders in `.gitignore` correctly so `node_modules` aren't pushed.
