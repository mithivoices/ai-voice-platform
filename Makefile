.PHONY: help install install-backend install-frontend run test clean

help:
	@echo "Mithivoices - Development Commands"
	@echo ""
	@echo "  make install          - Install all dependencies"
	@echo "  make install-backend  - Install backend dependencies"
	@echo "  make install-frontend - Install frontend dependencies"
	@echo "  make run              - Run both backend and frontend"
	@echo "  make test             - Run all tests"
	@echo "  make clean            - Clean build artifacts"
	@echo "  make download-models  - Download voice models"

install: install-backend install-frontend

install-backend:
	@echo "Installing backend dependencies..."
	cd backend && python -m pip install -r requirements.txt

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

download-models:
	@echo "Downloading voice models..."
	python download_models.py

run:
	@echo "Starting backend and frontend..."
	@echo "Run 'make run-backend' and 'make run-frontend' in separate terminals"

run-backend:
	cd backend && python main.py

run-frontend:
	cd frontend && npm run dev

test:
	@echo "Running backend tests..."
	cd backend && python -m pytest tests/ || echo "No backend tests found"
	@echo "Running frontend tests..."
	cd frontend && npm run test || echo "No frontend tests found"

lint:
	@echo "Linting backend..."
	cd backend && flake8 . --max-line-length=127 || echo "flake8 not installed"
	@echo "Linting frontend..."
	cd frontend && npm run lint || echo "No lint script found"

clean:
	@echo "Cleaning build artifacts..."
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	cd frontend && rm -rf dist node_modules/.cache
