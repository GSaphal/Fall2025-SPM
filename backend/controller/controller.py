import os

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

from image_processing.ocr import extract_text_from_images
from image_processing.receipt_processor import structured_output
from model.model import User, db, Product, Store, UserExpenditure

# User controller
user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    # Create user
    n_user = User(username=data['username'], email=data['email'], password=data['password'], role=data['role'])
    db.session.add(n_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

@user_controller.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'username': user.username, 'email': user.email, 'role': user.role} for user in users])

@user_controller.route('/users/<string:email>', methods=['GET'])
def get_user(email):
    user = User.query.filter_by(email=email).first()
    return jsonify({'username': user.username, 'email': user.email, 'role': user.role})

# User expenditure controller
user_expenditure_controller = Blueprint('user_expenditure_controller', __name__)

@user_expenditure_controller.route('/user-expenditures', methods=['POST'])
def create_user_expenditure():
    data = request.get_json()
    # Create user expenditure
    n_user_expenditure = UserExpenditure(user_id=data['user_id'], amount=data['amount'], date=data['date'], product_name=data['product_name'])
    db.session.add(n_user_expenditure)
    db.session.commit()
    return jsonify({'message': 'User expenditure created successfully!'}), 201

@user_expenditure_controller.route('/user-expenditures', methods=['GET'])
def get_user_expenditures():
    user_expenditures = UserExpenditure.query.all()
    return jsonify([{'user_id': user_expenditure.user_id, 'amount': user_expenditure.amount, 'date': user_expenditure.date, 'product_name': user_expenditure.product_name} for user_expenditure in user_expenditures])


product_controller = Blueprint('production_controller', __name__)

@product_controller.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    # Create product
    n_product = Product(name=data['name'], price=data['price'], discount=data['discount'], store_id=data['store_id'], owner_id=data['owner_id'])
    db.session.add(n_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully!'}), 201

@product_controller.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'name': product.name, 'price': product.price} for product in products])

store_controller = Blueprint('store_controller', __name__)

@store_controller.route('/stores', methods=['POST'])
def create_store():
    data = request.get_json()
    # Create store
    n_store = Store(name=data['name'], location=data['location'])
    db.session.add(n_store)
    db.session.commit()
    return jsonify({'message': 'Store created successfully!'}), 201

@store_controller.route('/stores', methods=['GET'])
def get_stores():
    stores = Store.query.all()
    return jsonify([{'name': store.name, 'location': store.location} for store in stores])

# Define the upload folder and allowed extensions
UPLOAD_FOLDER = 'files'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_controller.route('/upload-receipts', methods=['POST'])
def upload_receipts():
    """
    API endpoint to upload receipt images and process them for a specific user.
    """
    # Get the user ID from the request (e.g., from a token or request body)
    user_id = request.form.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Get the uploaded files
    if 'files' not in request.files:
        return jsonify({'error': 'No files uploaded'}), 400

    files = request.files.getlist('files')
    image_files = []
    # Save the uploaded files to the upload folder
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            image_files.append(file_path)
        else:
            return jsonify({'error': 'Invalid file type'}), 400

    # Step 1: Extract text from the image(s)
    texts = extract_text_from_images(image_files)

    # Step 2: Process the text using your structured_output function
    api_key = os.getenv('OPENAI_API_KEY')
    structured_receipts = structured_output(texts, api_key)

    # Step 3: Store the extracted products as user_expenditure for the specific user
    for receipt in structured_receipts:
        for item in receipt.items:
            user_expenditure = UserExpenditure(
                user_id=user_id,
                amount=item.price,
                # date=receipt['date'],
                product_name=item.name
            )
            db.session.add(user_expenditure)
        db.session.commit()

    # Return success message
    return jsonify({'message': 'Expenditures saved successfully!'}), 200
