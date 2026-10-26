from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.routes import health, tutors, enquiries, admin

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend REST API for GharGuru Home Tutor Marketplace in Mumbai",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 routers
app.include_router(health.router, prefix=settings.API_V1_STR, tags=["Health"])
app.include_router(tutors.router, prefix=settings.API_V1_STR, tags=["Tutors"])
app.include_router(enquiries.router, prefix=settings.API_V1_STR, tags=["Enquiries"])
app.include_router(admin.router, prefix=settings.API_V1_STR, tags=["Admin & Reference"])

@app.get("/")
def root():
    return {
        "message": "Welcome to GharGuru API",
        "tagline": "The right tutor. Right at home.",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health"
    }
