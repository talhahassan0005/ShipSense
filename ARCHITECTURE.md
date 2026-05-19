# ShipSense Deployment Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                           │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┼──────────┐
         │           │          │
    ┌────▼─────┐ ┌──▼──────┐ ┌─▼──────────┐
    │ HTML/CSS │ │JavaScript│ │ Assets    │
    └────┬─────┘ └──┬──────┘ └─┬──────────┘
         │          │          │
         └──────────┼──────────┘
                    │
        ┌───────────▼──────────┐
        │  VERCEL (Frontend)   │
        │  shipsense.vercel.app│
        └───────────┬──────────┘
                    │
        (HTTPS API Calls)
                    │
        ┌───────────▼─────────────────┐
        │  HF SPACES (Backend)        │
        │  username-backend.hf.space  │
        │  (FastAPI + LLaMA Agent)    │
        └───────────┬─────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
    ┌───▼───┐  ┌────▼─────┐ ┌──▼──────┐
    │ Groq  │  │Database  │ │ Models  │
    │ API   │  │ (Neon)   │ │(model.ubj)
    └───────┘  └──────────┘ └─────────┘
```

## Components

### 1. Frontend (Vercel)
- **Framework**: Next.js 14
- **Deployment**: Vercel
- **Features**:
  - Real-time prediction form
  - Delivery delay predictions chart
  - AI chatbot interface
  - Responsive design
- **Environment**: `NEXT_PUBLIC_BACKEND_URL`

### 2. Backend (HF Spaces)
- **Framework**: FastAPI
- **Deployment**: Hugging Face Spaces (Docker)
- **Features**:
  - `/predict` - ML predictions
  - `/api/agent/chat` - LLaMA AI chat
  - `/predictions` - History
  - `/health` - Status check
- **Dependencies**: 
  - Groq LLaMA 3.3 70B model
  - SQLAlchemy for database
  - LangGraph for agent orchestration

### 3. External Services
- **Groq API**: LLaMA model inference
- **Database**: PostgreSQL (Neon free tier)
- **Storage**: Model file (model.ubj)

---

## Deployment Steps

### Phase 1: Prepare Repositories

```bash
# Backend repo on HF Spaces
https://huggingface.co/spaces/YOUR_USERNAME/shipsense-backend

# Frontend repo on GitHub
https://github.com/YOUR_USERNAME/shipsense

# Both need to be pushed to their platforms
```

### Phase 2: Backend Setup (HF Spaces)

1. Create new Space on HF
2. Select Docker SDK
3. Push backend code:
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/shipsense-backend
   cp -r backend/* shipsense-backend/
   cd shipsense-backend && git push
   ```
4. Add secrets in HF Space settings:
   - `GROQ_API_KEY`
   - `DATABASE_URL` (optional)
5. HF automatically builds and deploys

### Phase 3: Frontend Setup (Vercel)

1. Import from GitHub
2. Configure:
   - Root Directory: `frontend`
   - Framework: Next.js
3. Add environment variable:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://username-shipsense-backend.hf.space
   ```
4. Deploy (auto-deploys on push)

### Phase 4: Connect & Test

1. Test backend health:
   ```bash
   curl https://username-shipsense-backend.hf.space/health
   ```
2. Test frontend + backend:
   - Open frontend URL
   - Try chat or prediction
   - Monitor browser console

---

## Data Flow

### Prediction Request
```
User Form (Frontend)
    ↓
POST /predict (FastAPI)
    ↓
ML Model (model.ubj)
    ↓
Database (optional save)
    ↓
JSON Response
    ↓
Chart Update (Frontend)
```

### Chat Request
```
User Message (Frontend)
    ↓
POST /api/agent/chat (FastAPI)
    ↓
Groq LLaMA API
    ↓
Agent Tools (predictions, analysis)
    ↓
Response Text
    ↓
Chat Bubble (Frontend)
```

---

## Environment Variables

### Frontend (.env.local or Vercel Settings)
```
NEXT_PUBLIC_BACKEND_URL=https://username-shipsense-backend.hf.space
```

### Backend (HF Spaces Secrets)
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
DATABASE_URL=postgresql+asyncpg://...  (optional)
```

---

## Monitoring & Maintenance

### Monitor Backend
- HF Spaces provides logs
- Check Space settings for status
- Monitor API response times

### Monitor Frontend
- Vercel analytics
- Error tracking (optional: Sentry)
- Performance monitoring

### Update Procedures

**Backend Updates:**
```bash
cd shipsense-backend-hf-repo
# Make changes
git push  # Auto-redeploys
```

**Frontend Updates:**
```bash
git push origin main  # Auto-redeploys on Vercel
```

---

## Scaling Considerations

### Current Limits
- **HF Spaces Free**: Limited compute
- **Vercel Free**: Limited bandwidth
- **Groq Free**: Rate-limited

### Upgrade Options
- **HF Spaces Pro**: $9/month for more compute
- **Vercel Pro**: $20/month for more features
- **Groq Paid**: Usage-based pricing
- **Database**: Scale Neon as needed

---

## Security Notes

1. **API Keys**: Store in environment secrets, never in code
2. **CORS**: Configure for specific domains
3. **Rate Limiting**: Add if needed for production
4. **Input Validation**: Already implemented in FastAPI
5. **HTTPS**: Both services use HTTPS by default

---

## Troubleshooting

### Backend Won't Build
- Check Dockerfile syntax
- Verify requirements.txt has all dependencies
- Check HF Spaces build logs

### CORS Errors
- Verify `NEXT_PUBLIC_BACKEND_URL` is correct
- Update CORS in backend `main.py` if needed

### API Timeouts
- Check Groq API status
- Verify database connection
- Check HF Spaces resources

### Missing Dependencies
- Update requirements.txt
- Rebuild HF Space

---

## Cost Estimate (Monthly)

| Service | Free Tier | Notes |
|---------|-----------|-------|
| HF Spaces | Free | Limited GPU |
| Vercel | Free | Unlimited deployments |
| Groq API | Free | Rate-limited |
| Neon DB | Free | 5GB storage |
| **Total** | **$0** | Perfect for starting! |

---

## Next Steps

1. ✅ Read [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for quick start
2. ✅ Read [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
3. ✅ Get API keys (Groq)
4. ✅ Create HF Space
5. ✅ Deploy backend
6. ✅ Push frontend to GitHub
7. ✅ Deploy on Vercel
8. ✅ Test connection
9. ✅ Share with world! 🚀
