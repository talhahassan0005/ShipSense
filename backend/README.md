---
title: Supply Chain AI Backend
emoji: 🚚
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
---

# Supply Chain AI - Backend API

A FastAPI-based machine learning API for predicting late deliveries in supply chains.

## Features
- 🤖 ML model for delivery delay prediction
- 💬 AI-powered chat assistant using Groq LLaMA
- 📊 Real-time delivery analytics
- 🔌 RESTful API endpoints

## Deployment

This Space uses Docker to run the FastAPI backend. The API will be available at the Space URL.

## API Endpoints

- `POST /predict` - Get delivery delay prediction
- `GET /predictions` - Get recent predictions
- `POST /api/agent/chat` - Chat with AI agent
- `GET /health` - Health check

## Environment Variables Required

- `GROQ_API_KEY` - API key for Groq LLaMA model
- `DATABASE_URL` - PostgreSQL connection string (optional for Neon DB)

## Local Development

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 7860
```
