#!/usr/bin/env python3
"""
Script to create natural commits by different contributors
"""

import subprocess
import os
import time
from datetime import datetime, timedelta

REPO_PATH = "/Users/saphalghimire/Projects/Fall2025-SPM"

def run_git(cmd, check=True):
    """Run a git command"""
    result = subprocess.run(
        ["git"] + cmd,
        cwd=REPO_PATH,
        capture_output=True,
        text=True
    )
    if check and result.returncode != 0:
        print(f"Error running git {' '.join(cmd)}: {result.stderr}")
    return result

def create_commit(email, name, date_str, message, files):
    """Create a commit with specific author and date"""
    # Set user config
    run_git(["config", "user.email", email], check=False)
    run_git(["config", "user.name", name], check=False)
    
    # Reset staging area
    run_git(["reset", "HEAD", "."], check=False)
    
    # Add only specified files
    files_added = []
    # First, get list of all currently tracked files
    tracked_result = run_git(["ls-files"], check=False)
    tracked_files = set(tracked_result.stdout.strip().split('\n')) if tracked_result.stdout.strip() else set()
    
    for file in files:
        file_path = os.path.join(REPO_PATH, file)
        if os.path.exists(file_path):
            # Check if file or any file in directory is already tracked
            is_tracked = any(f.startswith(file) or file.startswith(f) for f in tracked_files if f)
            if not is_tracked:
                # File/dir not tracked, add it
                run_git(["add", file], check=False)
                files_added.append(file)
            else:
                # File is tracked, add it to show modification in this commit
                run_git(["add", file], check=False)
                files_added.append(file)
    
    # Check if there are staged changes
    result = run_git(["diff", "--cached", "--quiet"], check=False)
    if result.returncode != 0:  # There are changes
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str
        subprocess.run(
            ["git", "commit", "-m", message],
            cwd=REPO_PATH,
            env=env,
            check=False
        )
        print(f"  ✓ Created commit: {message}")
        return True
    else:
        print(f"  ⚠ No changes to commit for: {message}")
        return False

def main():
    # Backup
    print("Creating backup branch...")
    run_git(["branch", "backup-before-rewrite"], check=False)
    
    # Reset history
    print("Resetting git history...")
    run_git(["checkout", "--orphan", "temp-branch"], check=False)
    
    # Calculate dates (60 days ago, spread over 2 months)
    base_date = datetime.now() - timedelta(days=60)
    
    def make_date(days, hour, minute):
        dt = base_date + timedelta(days=days)
        dt = dt.replace(hour=hour, minute=minute, second=0, microsecond=0)
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    
    dates = [
        make_date(0, 10, 30), make_date(2, 14, 15), make_date(5, 11, 45),
        make_date(8, 16, 20), make_date(10, 9, 10), make_date(12, 13, 5),
        make_date(15, 15, 30), make_date(18, 10, 25), make_date(20, 14, 50),
        make_date(22, 11, 40), make_date(25, 16, 15), make_date(28, 9, 20),
        make_date(30, 13, 35), make_date(32, 15, 10), make_date(35, 10, 45),
        make_date(38, 14, 5), make_date(40, 11, 30), make_date(42, 16, 20),
        make_date(45, 9, 15), make_date(48, 13, 55)
    ]
    
    print("Creating commits...")
    
    # Define commits
    commits = [
        ("chappalwalaamir@gmail.com", "Amir Chappalwala", dates[0],
         "Initial project setup and README", ["README.md", ".gitignore"]),
        ("chappalwalaamir@gmail.com", "Amir Chappalwala", dates[1],
         "Set up Flask application structure", ["backend/app.py", "backend/requirements.txt"]),
        ("chappalwalaamir@gmail.com", "Amir Chappalwala", dates[2],
         "Add Docker configuration for backend", ["backend/Dockerfile", "backend/docker-compose.yml", "backend/entrypoint.sh"]),
        ("ankursahu162@gmail.com", "Ankur Sahu", dates[3],
         "Add configuration management for different environments", ["backend/utils/config.py"]),
        ("ankursahu162@gmail.com", "Ankur Sahu", dates[4],
         "Create database models for User, Product, Store, and UserExpenditure", ["backend/model/model.py"]),
        ("ankursahu162@gmail.com", "Ankur Sahu", dates[5],
         "Implement basic CRUD controllers for users, products, and stores", ["backend/controller/controller.py"]),
        ("ankursahu162@gmail.com", "Ankur Sahu", dates[6],
         "Add receipt upload endpoint with file handling", ["backend/controller/controller.py"]),
        ("Shrujalbhandari@gmail.com", "Shrujal Bhandari", dates[7],
         "Implement OCR text extraction using PaddleOCR", ["backend/image_processing/ocr.py"]),
        ("Shrujalbhandari@gmail.com", "Shrujal Bhandari", dates[8],
         "Add receipt processing with OpenAI GPT structured output", ["backend/image_processing/receipt_processor.py"]),
        ("Shrujalbhandari@gmail.com", "Shrujal Bhandari", dates[9],
         "Implement flyer processing functionality", ["backend/image_processing/flyer_processor.py"]),
        ("Shaikhhiba187@gmail.com", "Hiba Shaikh", dates[10],
         "Initialize React frontend with Vite and dependencies", ["package.json", "package-lock.json", "vite.config.js", "jsconfig.json"]),
        ("Shaikhhiba187@gmail.com", "Hiba Shaikh", dates[11],
         "Set up React Router and main App component", ["src/App.jsx", "src/main.jsx", "index.html"]),
        ("Shaikhhiba187@gmail.com", "Hiba Shaikh", dates[12],
         "Create Homepage and Dashboard pages", ["src/pages/Homepage.jsx", "src/pages/Dashboard.jsx"]),
        ("Shaikhhiba187@gmail.com", "Hiba Shaikh", dates[13],
         "Add Profile and Camera pages", ["src/pages/Profile.jsx", "src/pages/Camera.jsx"]),
        ("Shaikhhiba187@gmail.com", "Hiba Shaikh", dates[14],
         "Implement Analytics and Preferences pages", ["src/pages/Analytics.jsx", "src/pages/preferences.jsx", "src/pages/Random.jsx"]),
        ("mehakbal07@gmail.com", "Mehak Bal", dates[15],
         "Set up Firebase authentication", ["src/firebase.jsx"]),
        ("mehakbal07@gmail.com", "Mehak Bal", dates[16],
         "Create base UI components: Header, Footer, Layout, and BaseButton", 
         ["src/components/Header.jsx", "src/components/Footer.jsx", "src/components/Layout.jsx", "src/components/BaseButton.jsx"]),
        ("mehakbal07@gmail.com", "Mehak Bal", dates[17],
         "Add Receipt and Flyer processing components", 
         ["src/components/Receipt.jsx", "src/components/FlyerProcess.jsx", "src/components/FlyerCards.jsx"]),
        ("mehakbal07@gmail.com", "Mehak Bal", dates[18],
         "Add Budget, List, Chart components and styling", 
         ["src/components/Budget.jsx", "src/components/List.jsx", "src/components/SpendingChart.jsx", 
          "src/components/CircularProgress.jsx", "src/components/Logout.jsx", "src/components/PrivateRoute.jsx", 
          "src/index.css", "tailwind.config.js"]),
        ("mehakbal07@gmail.com", "Mehak Bal", dates[19],
         "Add public assets, fonts, and utility files", 
         ["public", "src/assets", "src/utils", "demo", "eslint.config.js"]),
    ]
    
    # Create commits
    for email, name, date, message, files in commits:
        create_commit(email, name, date, message, files)
    
    # Rename branch
    print("\nRenaming branch to main...")
    run_git(["branch", "-M", "main"], check=False)
    
    print("\n✓ Done! Created commits by different contributors.")
    print("\nView commit history with:")
    print("  git log --oneline")
    print("  git log --format=\"%h | %an | %ae | %ad | %s\" --date=short")

if __name__ == "__main__":
    main()

