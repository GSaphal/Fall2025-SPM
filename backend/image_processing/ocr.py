from paddleocr import PaddleOCR

def extract_text_from_images(image_files):
    """
    Extract text from receipt images using PaddleOCR.

    Args:
        image_files (list): List of image file paths.

    Returns:
        list: List of extracted text from each image.
    """
    ocr = PaddleOCR(lang="es", ocr_version="PP-OCRv4", show_log=False, use_gpu=True)
    all_texts = []
    print("Extracting text from images...")
    for image_file in image_files:
        # PaddleOCR accepts the image file path directly.
        result = ocr.ocr(image_file, cls=True)
        text = [line[1][0] for line in result[0]] if result and result[0] else []
        all_texts.append(" ".join(text))
    return all_texts