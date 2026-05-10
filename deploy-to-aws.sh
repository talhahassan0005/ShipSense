#!/bin/bash

# Supply Chain Prediction System - AWS Deployment Script
# This script builds Docker images and pushes them to Amazon ECR

set -e

# Configuration
AWS_REGION=${AWS_REGION:-"us-east-1"}
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
BACKEND_REPO="supply-chain-backend"
FRONTEND_REPO="supply-chain-frontend"
VERSION=${VERSION:-"latest"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed"
        exit 1
    fi
    
    if [ -z "$AWS_ACCOUNT_ID" ]; then
        print_error "AWS_ACCOUNT_ID environment variable is not set"
        exit 1
    fi
    
    print_info "All prerequisites satisfied"
}

# Login to ECR
login_to_ecr() {
    print_info "Logging in to Amazon ECR..."
    aws ecr get-login-password --region $AWS_REGION | \
        docker login --username AWS --password-stdin $ECR_REGISTRY
    print_info "Successfully logged in to ECR"
}

# Build backend image
build_backend() {
    print_info "Building backend Docker image..."
    docker build -t $BACKEND_REPO:$VERSION \
        -t $ECR_REGISTRY/$BACKEND_REPO:$VERSION \
        -t $ECR_REGISTRY/$BACKEND_REPO:latest \
        ./backend
    print_info "Backend image built successfully"
}

# Build frontend image
build_frontend() {
    print_info "Building frontend Docker image..."
    docker build -t $FRONTEND_REPO:$VERSION \
        -t $ECR_REGISTRY/$FRONTEND_REPO:$VERSION \
        -t $ECR_REGISTRY/$FRONTEND_REPO:latest \
        ./frontend
    print_info "Frontend image built successfully"
}

# Push backend image
push_backend() {
    print_info "Pushing backend image to ECR..."
    docker push $ECR_REGISTRY/$BACKEND_REPO:$VERSION
    docker push $ECR_REGISTRY/$BACKEND_REPO:latest
    print_info "Backend image pushed successfully"
}

# Push frontend image
push_frontend() {
    print_info "Pushing frontend image to ECR..."
    docker push $ECR_REGISTRY/$FRONTEND_REPO:$VERSION
    docker push $ECR_REGISTRY/$FRONTEND_REPO:latest
    print_info "Frontend image pushed successfully"
}

# Create ECR repositories (if they don't exist)
create_ecr_repositories() {
    print_info "Checking ECR repositories..."
    
    # Backend repository
    if ! aws ecr describe-repositories --repository-names $BACKEND_REPO --region $AWS_REGION &> /dev/null; then
        print_warning "Creating ECR repository: $BACKEND_REPO"
        aws ecr create-repository --repository-name $BACKEND_REPO --region $AWS_REGION
        # Add lifecycle policy to keep only 10 images
        aws ecr put-lifecycle-policy \
            --repository-name $BACKEND_REPO \
            --lifecycle-policy-text '{"rules":[{"rulePriority":1,"description":"Keep last 10 images","selection":{"tagStatus":"any","countType":"imageCountMoreThan","countNumber":10},"action":{"type":"expire"}}]}' \
            --region $AWS_REGION
    else
        print_info "Repository $BACKEND_REPO already exists"
    fi
    
    # Frontend repository
    if ! aws ecr describe-repositories --repository-names $FRONTEND_REPO --region $AWS_REGION &> /dev/null; then
        print_warning "Creating ECR repository: $FRONTEND_REPO"
        aws ecr create-repository --repository-name $FRONTEND_REPO --region $AWS_REGION
        # Add lifecycle policy to keep only 10 images
        aws ecr put-lifecycle-policy \
            --repository-name $FRONTEND_REPO \
            --lifecycle-policy-text '{"rules":[{"rulePriority":1,"description":"Keep last 10 images","selection":{"tagStatus":"any","countType":"imageCountMoreThan","countNumber":10},"action":{"type":"expire"}}]}' \
            --region $AWS_REGION
    else
        print_info "Repository $FRONTEND_REPO already exists"
    fi
}

# Test locally with docker-compose
test_locally() {
    print_info "Testing application locally with docker-compose..."
    
    if ! command -v docker-compose &> /dev/null; then
        print_warning "docker-compose is not installed, skipping local test"
        return
    fi
    
    # Check if .env.docker exists
    if [ ! -f .env.docker ]; then
        print_error ".env.docker file not found"
        return
    fi
    
    print_info "Starting containers..."
    docker-compose --env-file .env.docker up -d
    
    print_info "Waiting for services to be healthy..."
    sleep 10
    
    # Test backend health
    if curl -f http://localhost:8000/health > /dev/null 2>&1; then
        print_info "Backend health check passed"
    else
        print_warning "Backend health check failed"
    fi
    
    print_info "Local testing completed. Stopping containers..."
    docker-compose down
}

# Show deployment info
show_deployment_info() {
    echo ""
    print_info "Deployment Information:"
    echo "========================"
    echo "AWS Region: $AWS_REGION"
    echo "AWS Account: $AWS_ACCOUNT_ID"
    echo "ECR Registry: $ECR_REGISTRY"
    echo "Backend Image: $ECR_REGISTRY/$BACKEND_REPO:$VERSION"
    echo "Frontend Image: $ECR_REGISTRY/$FRONTEND_REPO:$VERSION"
    echo ""
    echo "Next steps:"
    echo "1. Update your ECS task definitions with the new image URIs"
    echo "2. Deploy to ECS/Fargate"
    echo "3. Configure your load balancer and Route 53"
    echo "4. Refer to AWS_DEPLOYMENT_GUIDE.md for detailed instructions"
    echo ""
}

# Main execution
main() {
    echo ""
    echo "=================================================="
    echo "Supply Chain Prediction System - AWS Deployment"
    echo "=================================================="
    echo ""
    
    # Parse command line arguments
    case "${1:-deploy}" in
        deploy)
            check_prerequisites
            create_ecr_repositories
            login_to_ecr
            build_backend
            build_frontend
            push_backend
            push_frontend
            show_deployment_info
            ;;
        build)
            check_prerequisites
            build_backend
            build_frontend
            ;;
        test)
            test_locally
            ;;
        push)
            check_prerequisites
            login_to_ecr
            push_backend
            push_frontend
            ;;
        *)
            echo "Usage: $0 {deploy|build|test|push}"
            echo ""
            echo "Commands:"
            echo "  deploy  - Build images and push to ECR (default)"
            echo "  build   - Build Docker images locally"
            echo "  test    - Test application locally with docker-compose"
            echo "  push    - Push pre-built images to ECR"
            echo ""
            echo "Environment variables:"
            echo "  AWS_ACCOUNT_ID   - Your AWS account ID (required)"
            echo "  AWS_REGION       - AWS region (default: us-east-1)"
            echo "  VERSION          - Image version tag (default: latest)"
            echo ""
            exit 1
            ;;
    esac
}

main "$@"
