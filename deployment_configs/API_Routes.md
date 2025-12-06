# Postman Routes Collection

| Method | Endpoint | Description | Auth Required | Body |
| :--- | :--- | :--- | :--- | :--- |
| **AUTH** | | | | |
| POST | `/api/auth/register` | Register User | No | `{ name, email, password }` |
| POST | `/api/auth/login` | Login User | No | `{ email, password }` |
| GET | `/api/auth/me` | Get Current User | Yes | - |

| **NOTES** | | | | |
| GET | `/api/notes?search=abc` | List Notes (Search) | Yes | - |
| POST | `/api/notes` | Create Note | Yes | `{ title, subject, content, tags }` |
| GET | `/api/notes/:id` | Get Note Details | Yes | - |
| PUT | `/api/notes/:id` | Update Note | Yes | `{ title, content ... }` |
| DELETE | `/api/notes/:id` | Delete Note | Yes | - |

| **AI FEATURES** | | | | |
| POST | `/api/notes/:id/generate-summary` | Generate Summary | Yes | - |
| GET | `/api/notes/:id/summary` | Get Summary | Yes | - |
| POST | `/api/notes/:id/generate-flashcards` | Generate Flashcards| Yes | - |
| GET | `/api/notes/:id/flashcards` | Get Flashcards | Yes | - |

| **QUIZ & FLASHCARDS** | | | | |
| DELETE | `/api/flashcards/:id` | Delete Flashcard | Yes | - |
| PATCH | `/api/flashcards/:id/status` | Update Status | Yes | `{ status: 'mastered' }` |
| POST | `/api/quiz/start` | Start Quiz Session | Yes | `{ noteId }` |
| POST | `/api/quiz/:id/answer` | Submit Answer | Yes | `{ correct: true }` |
