# Deployment Guide

## 1. Backend Deployment (Render)

1. **Push Code to GitHub**: Ensure your project is in a GitHub repository.
2. **Create Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" -> "Web Service"
   - Connect your GitHub repo.
3. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. **Environment Variables**:
   Add the following in the "Environment" tab:
   - `MONGO_URI`: Your MongoDB Atlas content string
   - `JWT_ACCESS_SECRET`: Secret key
   - `JWT_REFRESH_SECRET`: Secret key
   - `AI_API_KEY`: Your OpenAI/Gemini Key
   - `CLIENT_URL`: `https://your-frontend-project.vercel.app` (Add this AFTER deploying frontend)

## 2. Frontend Deployment (Vercel)

1. **Import Project**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - "Add New" -> "Project" -> Import from GitHub.
2. **Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - Not strictly needed if you hardcoded the API URL or use a proxy, but better to use `VITE_API_URL` if you updated `axios.js` to use it.
   - *Note*: If `axios.js` uses `localhost:5000`, you MUST change it to your Render Backend URL before deploying.
   
   **Update `frontend/src/api/axios.js`:**
   ```javascript
   const api = axios.create({
       baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
       withCredentials: true,
   });
   ```

   Then adds `VITE_API_URL` = `https://your-backend-service.onrender.com` in Vercel.

## 3. Final Connection

1. Once Frontend is deployed, copy its URL (e.g., `https://study-ai.vercel.app`).
2. Go back to **Render** (Backend) -> Environment Variables.
3. Update `CLIENT_URL` to match the Vercel URL.
4. Redeploy Backend if needed (usually auto-redeploys on commit).

## 4. Database (MongoDB Atlas)

1. Ensure "Network Access" in MongoDB Atlas allows access from anywhere (`0.0.0.0/0`) or specifically from Render IPs (easier to allow all for hobby projects).
