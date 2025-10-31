# Monetrix Application

This application is designed to extract and process information from receipts and flyers using Optical Character Recognition (OCR) and structured data generation with OpenAI's GPT models. It can extract product details, prices, discounts, and other relevant information from images of receipts and flyers, and store the structured data for further use.

---

## Table of Contents

1. [Features](#features)
2. [Workflow](#workflow)
3. [Directory Structure](#directory-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **OCR Integration**: Uses PaddleOCR to extract text from receipt and flyer images.
- **Structured Data Generation**: Uses OpenAI's GPT models to convert extracted text into structured JSON objects.
- **Receipt Processing**: Extracts store details, product information, prices, discounts, and payment methods from receipts.
- **Flyer Processing**: Extracts product details, prices, and discounts from flyers.
- **API Endpoints**: Provides RESTful APIs for uploading images and retrieving structured data.
- **Database Integration**: Stores processed data in a database for future reference.

---

## Workflow

1. **Image Upload**:
   - Users upload images of receipts or flyers via the frontend or API.
   - Images are saved to a designated upload folder.

2. **Text Extraction**:
   - The application uses PaddleOCR to extract text from the uploaded images.
   - Extracted text is passed to the next stage for processing.

3. **Structured Data Generation**:
   - The extracted text is processed using OpenAI's GPT models.
   - The model generates structured JSON objects containing store details, product information, prices, discounts, etc.

4. **Data Storage**:
   - The structured data is stored in a database (e.g., PostgreSQL) for future use.
   - For receipts, the data is stored as `user_expenditure` for specific users.

5. **API Response**:
   - The processed data is returned to the frontend or API client in JSON format.

---

## Directory Structure

```
│   app.py
│   README.md
│
├───controller
│   │   controller.py
│   │
│   └───__pycache__
│
├───image_processing
│   │   __init__.py
│   │   ocr.py
│   │   receipt_processor.py
│   │   flyer_processor.py
│   │
│   └───__pycache__
│
├───login
│       config.py
│       controller.py
│       models.py
│       server.py
│       view.py
│
├───model
│   │   model.py
│   │
│   └───__pycache__
│
├───utils
│   │   config.py
│
└───uploads
```

---

## Setup and Installation

### Prerequisites

- Python 3.8 or higher
- PostgreSQL (or any other database)
- OpenAI API key
- PaddleOCR dependencies (GPU support recommended)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=postgresql://username:password@localhost/dbname
   SECRET_KEY=your_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Initialize the Database**:
   Run the following commands to set up the database:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

5. **Run the Application**:
   ```bash
   python app.py
   ```

---

## Usage

### Uploading Receipts

1. Use the `/upload-receipts` API endpoint to upload receipt images.
2. The application will process the images and return structured data in JSON format.

### Uploading Flyers

1. Use the `/upload-flyers` API endpoint to upload flyer images.
2. The application will process the images and return structured data in JSON format.

### Example API Request

```bash
curl -X POST -F "files=@receipt.jpg" -F "user_id=1" http://localhost:5000/upload-receipts
```

### Example API Response

```json
{
  "message": "Receipts processed successfully!",
  "data": [
    {
      "store": "HiperDino",
      "address": "9238-SD Bernardo de la torre",
      "city": "Tafira Baja",
      "phone": "928493638",
      "receipt_no": "2024/923813-00060866",
      "date": "15/04/2024",
      "time": "16:01",
      "items": [
        {
          "name": "FRESA TARINA 500 GR",
          "unit": 1,
          "price": 1.59,
          "amount": 1.59,
          "category": "fruits"
        }
      ],
      "total": 9.96,
      "number_items": 5,
      "payment_method": "tarjeta"
    }
  ]
}
```

---

## API Endpoints

| Endpoint            | Method | Description                          |
|----------------------|--------|--------------------------------------|
| `/upload-receipts`   | POST   | Upload receipt images for processing |
| `/upload-flyers`     | POST   | Upload flyer images for processing   |
| `/users`             | GET    | Retrieve all users                   |
| `/users/<int:id>`    | GET    | Retrieve a specific user             |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---
