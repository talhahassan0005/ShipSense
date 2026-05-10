@echo off
REM Supply Chain Prediction System - AWS Deployment Script for Windows
REM This script builds Docker images and pushes them to Amazon ECR

setlocal enabledelayedexpansion

REM Configuration
set AWS_REGION=%AWS_REGION%
if "!AWS_REGION!"=="" set AWS_REGION=us-east-1

set AWS_ACCOUNT_ID=%AWS_ACCOUNT_ID%
if "!AWS_ACCOUNT_ID!"=="" (
    echo.
    echo [ERROR] AWS_ACCOUNT_ID environment variable is not set
    echo.
    echo Set it with:
    echo   set AWS_ACCOUNT_ID=123456789012
    echo.
    exit /b 1
)

set ECR_REGISTRY=!AWS_ACCOUNT_ID!.dkr.ecr.!AWS_REGION!.amazonaws.com
set BACKEND_REPO=supply-chain-backend
set FRONTEND_REPO=supply-chain-frontend
set VERSION=%VERSION%
if "!VERSION!"=="" set VERSION=latest

REM Main execution
echo.
echo ==================================================
echo Supply Chain Prediction System - AWS Deployment
echo ==================================================
echo.

if "%1"=="" goto deploy
if "%1"=="deploy" goto deploy
if "%1"=="build" goto build
if "%1"=="test" goto test
if "%1"=="push" goto push
goto usage

:deploy
echo [INFO] Checking prerequisites...
where docker >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed
    exit /b 1
)
where aws >nul 2>&1
if errorlevel 1 (
    echo [ERROR] AWS CLI is not installed
    exit /b 1
)
echo [INFO] All prerequisites satisfied

REM Create repositories
echo [INFO] Checking ECR repositories...
aws ecr describe-repositories --repository-names %BACKEND_REPO% --region %AWS_REGION% >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Creating ECR repository: %BACKEND_REPO%
    aws ecr create-repository --repository-name %BACKEND_REPO% --region %AWS_REGION%
)
aws ecr describe-repositories --repository-names %FRONTEND_REPO% --region %AWS_REGION% >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Creating ECR repository: %FRONTEND_REPO%
    aws ecr create-repository --repository-name %FRONTEND_REPO% --region %AWS_REGION%
)

REM Login to ECR
echo [INFO] Logging in to Amazon ECR...
for /f "delims=" %%i in ('aws ecr get-login-password --region %AWS_REGION%') do (
    docker login --username AWS --password %%i %ECR_REGISTRY%
)
echo [INFO] Successfully logged in to ECR

goto build

:build
echo [INFO] Building backend Docker image...
docker build -t %BACKEND_REPO%:%VERSION% ^
    -t %ECR_REGISTRY%/%BACKEND_REPO%:%VERSION% ^
    -t %ECR_REGISTRY%/%BACKEND_REPO%:latest ^
    ./backend
echo [INFO] Backend image built successfully

echo [INFO] Building frontend Docker image...
docker build -t %FRONTEND_REPO%:%VERSION% ^
    -t %ECR_REGISTRY%/%FRONTEND_REPO%:%VERSION% ^
    -t %ECR_REGISTRY%/%FRONTEND_REPO%:latest ^
    ./frontend
echo [INFO] Frontend image built successfully

if "%1"=="build" goto show_info

goto push

:push
echo [INFO] Pushing backend image to ECR...
docker push %ECR_REGISTRY%/%BACKEND_REPO%:%VERSION%
docker push %ECR_REGISTRY%/%BACKEND_REPO%:latest
echo [INFO] Backend image pushed successfully

echo [INFO] Pushing frontend image to ECR...
docker push %ECR_REGISTRY%/%FRONTEND_REPO%:%VERSION%
docker push %ECR_REGISTRY%/%FRONTEND_REPO%:latest
echo [INFO] Frontend image pushed successfully

goto show_info

:test
echo [INFO] Testing application locally with docker-compose...
where docker-compose >nul 2>&1
if errorlevel 1 (
    echo [WARNING] docker-compose is not installed, skipping local test
    exit /b 0
)

if not exist .env.docker (
    echo [ERROR] .env.docker file not found
    exit /b 1
)

echo [INFO] Starting containers...
docker-compose --env-file .env.docker up -d

echo [INFO] Waiting for services to be healthy...
timeout /t 10 /nobreak

echo [INFO] Stopping containers...
docker-compose down

goto end

:show_info
echo.
echo [INFO] Deployment Information:
echo ========================
echo AWS Region: %AWS_REGION%
echo AWS Account: %AWS_ACCOUNT_ID%
echo ECR Registry: %ECR_REGISTRY%
echo Backend Image: %ECR_REGISTRY%/%BACKEND_REPO%:%VERSION%
echo Frontend Image: %ECR_REGISTRY%/%FRONTEND_REPO%:%VERSION%
echo.
echo Next steps:
echo 1. Update your ECS task definitions with the new image URIs
echo 2. Deploy to ECS/Fargate
echo 3. Configure your load balancer and Route 53
echo 4. Refer to AWS_DEPLOYMENT_GUIDE.md for detailed instructions
echo.
goto end

:usage
echo.
echo Usage: %0 {deploy^|build^|test^|push}
echo.
echo Commands:
echo   deploy  - Build images and push to ECR (default)
echo   build   - Build Docker images locally
echo   test    - Test application locally with docker-compose
echo   push    - Push pre-built images to ECR
echo.
echo Environment variables:
echo   AWS_ACCOUNT_ID   - Your AWS account ID (required)
echo   AWS_REGION       - AWS region (default: us-east-1)
echo   VERSION          - Image version tag (default: latest)
echo.
exit /b 1

:end
endlocal
