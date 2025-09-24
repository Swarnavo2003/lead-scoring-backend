# Lead Scoring API

A backend service for uploading leads, scoring them using **rule-based logic + AI**, and exporting the results as JSON or CSV. Built with **Node.js**, **Express**, **MongoDB**, and **OpenAI GPT** integration.

---

## 🛠 Tech Stack

- Node.js (v20+)
- Express.js
- MongoDB / Mongoose
- OpenAI GPT-4o-mini (AI scoring)
- Multer (CSV upload)
- express-validator (input validation)
- dotenv

---

## ⚡ Features

- Upload leads via CSV
- Create and manage product/offers
- Score leads using:
  - **Rule Layer**: role relevance, industry match, data completeness
  - **AI Layer**: OpenAI GPT classification (High / Medium / Low intent)
- Export scored results as CSV with clickable download links
- Deployed API ready for testing

---

### API Endpoints

| Method | URL                      | Body / Params                                | Description                          |
| ------ | ------------------------ | -------------------------------------------- | ------------------------------------ |
| POST   | `/api/v1/offers`         | JSON: `{name, value_props, ideal_use_cases}` | Create a new offer                   |
| GET    | `/api/v1/offers/latest`  | None                                         | Get the latest offer                 |
| POST   | `/api/v1/leads/upload`   | Form-data: `file` (CSV)                      | Upload leads CSV                     |
| GET    | `/api/v1/leads`          | None                                         | Get all uploaded leads               |
| POST   | `/api/v1/results/score`  | None                                         | Score all leads against latest offer |
| GET    | `/api/v1/results`        | None                                         | Get scored results in JSON           |
| GET    | `/api/v1/results/export` | None                                         | Export results as downloadable CSV   |

---

## 📦 Setup

1. Clone the repository:

```bash
git clone https://github.com/Swarnavo2003/lead-scoring-backend
cd lead-scoring-backend
```
