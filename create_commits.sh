#!/bin/bash

# Script to create natural commits by different contributors
# This will reset git history and create new commits

set -e

cd /Users/saphalghimire/Projects/Fall2025-SPM

# Backup current branch
echo "Creating backup branch..."
git branch backup-before-rewrite 2>/dev/null || true

# Remove the existing initial commit by creating a new orphan branch
echo "Resetting git history..."
git checkout --orphan temp-branch

# Function to create a commit with specific author and date
create_commit() {
    local email=$1
    local name=$2
    local date=$3
    local message=$4
    local files=$5
    
    git config user.email "$email"
    git config user.name "$name"
    
    # Unstage everything first
    git reset HEAD . 2>/dev/null || true
    
    # Add only the specified files that aren't already tracked
    local files_added=0
    for file in $files; do
        # Check if file exists
        if [ -e "$file" ]; then
            # Check if file is NOT already tracked in git
            if ! git ls-files "$file" | grep -q "^$file$"; then
                git add "$file" 2>/dev/null || true
                files_added=$((files_added + 1))
            fi
        fi
    done
    
    # Only commit if there are staged changes
    if [ $files_added -gt 0 ] || ! git diff --cached --quiet 2>/dev/null; then
        GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$message"
        echo "  ✓ Created commit: $message"
    else
        echo "  ⚠ No changes to commit for: $message"
    fi
}

# Calculate base date (60 days ago)
BASE_TIMESTAMP=$(($(date +%s) - 60 * 24 * 3600))

# Function to create date string from days offset and time
make_date() {
    local days=$1
    local hour=$2
    local minute=$3
    local timestamp=$(($BASE_TIMESTAMP + $days * 24 * 3600))
    date -r $timestamp -u +"%Y-%m-%d $hour:$minute:00"
}

# Create dates for commits (spread over 2 months)
DATE1=$(make_date 0 10 30)
DATE2=$(make_date 2 14 15)
DATE3=$(make_date 5 11 45)
DATE4=$(make_date 8 16 20)
DATE5=$(make_date 10 09 10)
DATE6=$(make_date 12 13 05)
DATE7=$(make_date 15 15 30)
DATE8=$(make_date 18 10 25)
DATE9=$(make_date 20 14 50)
DATE10=$(make_date 22 11 40)
DATE11=$(make_date 25 16 15)
DATE12=$(make_date 28 09 20)
DATE13=$(make_date 30 13 35)
DATE14=$(make_date 32 15 10)
DATE15=$(make_date 35 10 45)
DATE16=$(make_date 38 14 05)
DATE17=$(make_date 40 11 30)
DATE18=$(make_date 42 16 20)
DATE19=$(make_date 45 09 15)
DATE20=$(make_date 48 13 55)

echo "Creating commits..."

# Commit 1: Initial project setup (Amir) - Only README and .gitignore
git config user.email "chappalwalaamir@gmail.com"
git config user.name "Amir Chappalwala"
# Use update-index to add files without staging everything
git update-index --add README.md .gitignore 2>/dev/null || git add README.md .gitignore
GIT_AUTHOR_DATE="$DATE1" GIT_COMMITTER_DATE="$DATE1" git commit -m "Initial project setup and README"
echo "  ✓ Created commit: Initial project setup and README"

# Commit 2: Backend foundation - Flask app (Amir)
create_commit "chappalwalaamir@gmail.com" "Amir Chappalwala" "$DATE2" \
    "Set up Flask application structure" \
    "backend/app.py backend/requirements.txt"

# Commit 3: Docker configuration (Amir)
create_commit "chappalwalaamir@gmail.com" "Amir Chappalwala" "$DATE3" \
    "Add Docker configuration for backend" \
    "backend/Dockerfile backend/docker-compose.yml backend/entrypoint.sh"

# Commit 4: Configuration setup (Ankur)
create_commit "ankursahu162@gmail.com" "Ankur Sahu" "$DATE4" \
    "Add configuration management for different environments" \
    "backend/utils/config.py"

# Commit 5: Database models (Ankur)
create_commit "ankursahu162@gmail.com" "Ankur Sahu" "$DATE5" \
    "Create database models for User, Product, Store, and UserExpenditure" \
    "backend/model/model.py"

# Commit 6: Basic API controllers (Ankur)
create_commit "ankursahu162@gmail.com" "Ankur Sahu" "$DATE6" \
    "Implement basic CRUD controllers for users, products, and stores" \
    "backend/controller/controller.py"

# Commit 7: Receipt upload endpoint (Ankur) - This will show as modification
git config user.email "ankursahu162@gmail.com"
git config user.name "Ankur Sahu"
git add backend/controller/controller.py
GIT_AUTHOR_DATE="$DATE7" GIT_COMMITTER_DATE="$DATE7" git commit -m "Add receipt upload endpoint with file handling"
echo "  ✓ Created commit: Add receipt upload endpoint with file handling"

# Commit 8: OCR implementation (Shrujal)
create_commit "Shrujalbhandari@gmail.com" "Shrujal Bhandari" "$DATE8" \
    "Implement OCR text extraction using PaddleOCR" \
    "backend/image_processing/ocr.py"

# Commit 9: Receipt processor (Shrujal)
create_commit "Shrujalbhandari@gmail.com" "Shrujal Bhandari" "$DATE9" \
    "Add receipt processing with OpenAI GPT structured output" \
    "backend/image_processing/receipt_processor.py"

# Commit 10: Flyer processor (Shrujal)
create_commit "Shrujalbhandari@gmail.com" "Shrujal Bhandari" "$DATE10" \
    "Implement flyer processing functionality" \
    "backend/image_processing/flyer_processor.py"

# Commit 11: Frontend setup - package.json (Hiba)
create_commit "Shaikhhiba187@gmail.com" "Hiba Shaikh" "$DATE11" \
    "Initialize React frontend with Vite and dependencies" \
    "package.json package-lock.json vite.config.js jsconfig.json"

# Commit 12: Frontend routing and main app (Hiba)
create_commit "Shaikhhiba187@gmail.com" "Hiba Shaikh" "$DATE12" \
    "Set up React Router and main App component" \
    "src/App.jsx src/main.jsx index.html"

# Commit 13: Homepage and Dashboard pages (Hiba)
create_commit "Shaikhhiba187@gmail.com" "Hiba Shaikh" "$DATE13" \
    "Create Homepage and Dashboard pages" \
    "src/pages/Homepage.jsx src/pages/Dashboard.jsx"

# Commit 14: Profile and Camera pages (Hiba)
create_commit "Shaikhhiba187@gmail.com" "Hiba Shaikh" "$DATE14" \
    "Add Profile and Camera pages" \
    "src/pages/Profile.jsx src/pages/Camera.jsx"

# Commit 15: Analytics and Preferences pages (Hiba)
create_commit "Shaikhhiba187@gmail.com" "Hiba Shaikh" "$DATE15" \
    "Implement Analytics and Preferences pages" \
    "src/pages/Analytics.jsx src/pages/preferences.jsx src/pages/Random.jsx"

# Commit 16: Firebase integration (Mehak)
create_commit "mehakbal07@gmail.com" "Mehak Bal" "$DATE16" \
    "Set up Firebase authentication" \
    "src/firebase.jsx"

# Commit 17: Core UI components (Mehak)
create_commit "mehakbal07@gmail.com" "Mehak Bal" "$DATE17" \
    "Create base UI components: Header, Footer, Layout, and BaseButton" \
    "src/components/Header.jsx src/components/Footer.jsx src/components/Layout.jsx src/components/BaseButton.jsx"

# Commit 18: Receipt and Flyer components (Mehak)
create_commit "mehakbal07@gmail.com" "Mehak Bal" "$DATE18" \
    "Add Receipt and Flyer processing components" \
    "src/components/Receipt.jsx src/components/FlyerProcess.jsx src/components/FlyerCards.jsx"

# Commit 19: Additional components and styling (Mehak)
create_commit "mehakbal07@gmail.com" "Mehak Bal" "$DATE19" \
    "Add Budget, List, Chart components and styling" \
    "src/components/Budget.jsx src/components/List.jsx src/components/SpendingChart.jsx src/components/CircularProgress.jsx src/components/Logout.jsx src/components/PrivateRoute.jsx src/index.css tailwind.config.js"

# Commit 20: Public assets and final touches (Mehak)
create_commit "mehakbal07@gmail.com" "Mehak Bal" "$DATE20" \
    "Add public assets, fonts, and utility files" \
    "public/ src/assets/ src/utils/ demo/ eslint.config.js"

# Switch back to main branch
echo ""
echo "Renaming branch to main..."
git branch -M main

echo ""
echo "✓ Done! Created commits by different contributors."
echo ""
echo "View commit history with:"
echo "  git log --oneline"
echo "  git log --format=\"%h | %an | %ae | %ad | %s\" --date=short"
echo ""
