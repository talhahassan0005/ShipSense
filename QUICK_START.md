# 🚀 ShipSense AI Agent - Quick Start Guide

## Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API Key (free at https://console.groq.com)

---

## 📋 Step 1: Setup Backend

### 1.1 Get Groq API Key
1. Go to https://console.groq.com
2. Sign up (free account)
3. Create API key
4. Copy the key

### 1.2 Configure Backend Environment
Edit `backend/.env`:
```env
DATABASE_URL=postgresql+asyncpg://neondb_owner:npg_W3hfGzxXp2wq@ep-proud-recipe-aphgi8qi-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
GROQ_API_KEY=gsk_your_groq_api_key_here
```

Replace `gsk_your_groq_api_key_here` with your actual key.

### 1.3 Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 1.4 Start Backend Server
```bash
cd backend
uvicorn main:app --reload --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ Backend is running on `http://localhost:8000`

---

## 🌐 Step 2: Setup Frontend

### 2.1 Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2.2 Start Frontend Development Server
```bash
cd frontend
npm run dev
```

Expected output:
```
> npm run dev
▲ Next.js 14.2.35
- ready started server on 0.0.0.0:3000
```

✅ Frontend is running on `http://localhost:3000`

---

## 🧪 Step 3: Test the Application

### 3.1 Open the Application
1. Open your browser: http://localhost:3000
2. You should see the ShipSense dashboard
3. Look for the chat bubble in the bottom-right corner

### 3.2 Test the AI Agent Chat
1. Click the chat bubble (bottom-right)
2. Try one of these queries:
   - "Will an order with 5 days shipping and $1000 sales be delayed?"
   - "What does a Late prediction with 85% confidence mean?"
   - "Analyze this order's delivery risk with 3 days shipping"

### 3.3 Test the Prediction API
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Days_for_shipping_real": 5,
    "Days_for_shipment_scheduled": 3,
    "Benefit_per_order": 100,
    "Sales_per_customer": 500,
    "Order_Item_Discount_Rate": 0.1,
    "Order_Item_Profit_Ratio": 0.2,
    "Order_Item_Quantity": 10,
    "Sales": 1000
  }'
```

Expected response:
```json
{
  "prediction": 1,
  "confidence": 0.85,
  "status": "Late"
}
```

---

## 🔧 API Endpoints Reference

### Prediction Endpoint
- **URL**: `POST /predict`
- **Port**: 8000 (Backend)
- **Body**: Order details (see test example above)
- **Response**: Prediction (Late/On Time) with confidence score

### Agent Chat Endpoint
- **URL**: `POST /api/agent/chat`
- **Port**: 8000 (Backend)
- **Body**: 
  ```json
  {
    "message": "Your question here",
    "user_id": "optional-user-id",
    "conversation_id": "optional-conversation-id"
  }
  ```
- **Response**: Agent response with reasoning

### Health Check
- **URL**: `GET /health`
- **Port**: 8000 (Backend)
- **Response**: `{"status": "ok", "detail": "..."}`

### Predictions History
- **URL**: `GET /predictions`
- **Port**: 8000 (Backend)
- **Query Params**: `limit=20` (default)
- **Response**: List of recent predictions

---

## 🐛 Troubleshooting

### Frontend Shows "API error: 404"
**Problem**: Frontend can't reach backend
**Solution**: 
1. Make sure backend is running on port 8000
2. Check backend output for errors
3. Verify `GROQ_API_KEY` is set in `.env`

### "Cannot find module 'lucide-react'"
**Solution**:
```bash
cd frontend
npm install lucide-react
```

### "ModuleNotFoundError: No module named 'langchain_groq'"
**Solution**:
```bash
cd backend
pip install langchain-groq
```

### Backend fails to initialize agent
**Problem**: Agent not initializing but app still runs
**Solution**: 
1. Check `.env` has `GROQ_API_KEY`
2. Verify API key is valid at https://console.groq.com
3. Check internet connection
4. Restart backend

### Hydration mismatch errors
**Solution**: These are harmless warnings. The app will work fine.

---

## 📊 Architecture

```
Frontend (Next.js 3000)
    ↓ (HTTP Requests)
    ↓
Backend (FastAPI 8000)
    ↓ (LangChain)
    ↓
Groq API (Mixtral 8x7b)
    ↓
ML Model (XGBoost)
    ↓
Database (Neon PostgreSQL)
```

---

## 📝 Features Implemented

- ✅ ML Model as LangChain Tool
- ✅ AI Agent with ReAct Framework
- ✅ Chat UI Component
- ✅ Prediction API
- ✅ Agent Chat Endpoint
- ✅ CORS Configured
- ✅ Error Handling
- ✅ Groq API Integration (Fast & Free)

---

## 🎯 Next Steps

1. **Deploy Backend**: Use AWS/Azure/Railway
2. **Deploy Frontend**: Use Vercel/Netlify
3. **Add Authentication**: Implement user login
4. **Store Chat History**: Save conversations to database
5. **Add More Tools**: Expand agent capabilities

---

## 📞 Support

For issues, check:
1. Backend logs on port 8000
2. Frontend console (F12)
3. Groq API status
4. Database connection

**Happy Predicting!** 🚀
