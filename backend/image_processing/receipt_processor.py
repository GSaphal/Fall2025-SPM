from enum import Enum

from langchain.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from typing import List
import json


class PaymentMethodEnum(str, Enum):
    tarjeta = 'tarjeta'
    efectivo = 'efectivo'

class ItemInfo(BaseModel):
    name: str = Field(..., description="Name of the item")
    unit: float = Field(..., description="Quantity of the item")
    price: float = Field(..., description="Price per unit of the item")
    amount: float = Field(..., description="Total amount for the item")

class ReceiptInfo(BaseModel):
    store: str = Field(..., description="Store name")
    address: str = Field(..., description="Address of the store")
    city: str = Field(..., description="City where the store is located")
    phone: str = Field(..., description="Phone number of the store")
    receipt_no: str = Field(..., description="Receipt number")
    date: str = Field(..., description="Date of the receipt in DD/MM/YYYY format")
    time: str = Field(..., description="Time of the transaction")
    items: List[ItemInfo] = Field(..., description="List of items purchased")
    total: float = Field(..., description="Total amount of the receipt")
    number_items: int = Field(..., description="Number of items in the receipt")
    payment_method: PaymentMethodEnum = Field(..., description="Payment method used")

def get_model(api_key):
    model = ChatOpenAI(model="gpt-3.5-turbo-0125", api_key=api_key)
    structured_llm = model.with_structured_output(ReceiptInfo)
    return structured_llm

def structured_output(texts, api_key):
    """
    Process extracted text and structure it into a list of receipt objects (dictionaries).

    Args:
        texts (list): List of extracted text from receipts.
        api_key (str): OpenAI API key.

    Returns:
        list: List of structured receipt objects.
    """
    # Define examples and prompts
    example_cat_1 = {
        "store": "HiperDino",
        "address": "9238-SD Bernardo de la torre",
        "city": "Tafira Baja",
        "phone": "928493638",
        "receipt_no": "2024/923813-00060866",
        "date": "15/04/2024",
        "time": "16:01",
        "items": [
            {"name": "FRESA TARINA 500 GR", "unit": 1, "price": 1.59, "amount": 1.59, "category": "fruits"},
            {"name": "HIPERDINO ACEITUNA R/ANCHOA LATA 350", "unit": 1, "price": 0.95, "amount": 0.95, "category": "canned_goods"},
            {"name": "DESPERADOS CERVEZA TOQUE TEQUILA BOT", "unit": 1, "price": 1.05, "amount": 1.05, "category": "beverages"},
            {"name": "HIPERDINO CENTRO JAMON SERRANO BODEG", "unit": 0.310, "price": 13.62, "amount": 4.22, "category": "protein_foods"},
            {"name": "MONTESANO JAMON COCIDO SELECCION KG", "unit": 0.308, "price": 8.74, "amount": 2.15, "category": "protein_foods"}
        ],
        "total": 9.96,
        "number_items": 5,
        "payment_method": "tarjeta"
    }

    example_cat_2 = {
        "store": "SPAR TAFIRA",
        "address": "C/. Bruno Naranjo DIAZ 9A-9B",
        "city": "Tafira Baja",
        "phone": "928 351 616",
        "receipt_no": "014\\002-18965",
        "date": "06/04/2024",
        "time": "15:23",
        "items": [
            {"name": "CLIPPER MANZ.1.5L.", "unit": 1, "price": 1.49, "amount": 1.49, "category": "beverages"},
            {"name": "PLATANO PRIMERA GR", "unit": 1.40, "price": 1.99, "amount": 2.79, "category": "fruits"},
            {"name": "MANZANA PINK LADY GR", "unit": 1, "price": 2.99, "amount": 2.99, "category": "fruits"},
            {"name": "SALSA.BARI.PES.GEN.1", "unit": 1, "price": 3.10, "amount": 3.10, "category": "condiments"},
            {"name": "GOFIO B.LUGAR MIL.FU", "unit": 1, "price": 1.85, "amount": 1.85, "category": "grains"},
            {"name": "ZUM.DISF.D.SIMON PIN", "unit": 1, "price": 1.75, "amount": 1.75, "category": "beverages"},
            {"name": "LECHE.GRNJ.FLR.UHT.", "unit": 1, "price": 1.15, "amount": 1.15, "category": "dairy"}
        ],
        "total": 15.12,
        "number_items": 7,
        "payment_method": "tarjeta"
    }

    example_cat_4 = {
        "store": "MERCADONA",
        "address": "AVDA. PINTOR FELO MONZON (C.C. 7 PALMAS) S/N",
        "city": "35019 LAS PALMAS DE GRAN CANARIA",
        "phone": "928411755",
        "receipt_no": "2185-013-6970Z2",
        "date": "03/04/2024",
        "time": "21:22",
        "items": [
            {"name": "DETERG HIPO COLONIA", "unit": 1, "price": 3.30, "amount": 3.30, "category": "household"},
            {"name": "SOLOMILLO POLLO CONG", "unit": 3, "price": 4.50, "amount": 13.50, "category": "protein_foods"},
            {"name": "JAMONCITO BARBACOA", "unit": 1, "price": 2.32, "amount": 2.32, "category": "protein_foods"},
            {"name": "JAMONCITO BARBACOA", "unit": 1, "price": 2.76, "amount": 2.76, "category": "protein_foods"},
            {"name": "NUEZ NATURAL", "unit": 1, "price": 2.00, "amount": 2.00, "category": "nuts_and_seeds"},
            {"name": "QUESU COTIAGE", "unit": 2, "price": 1.25, "amount": 2.50, "category": "dairy"},
            {"name": "POLLO ENTERO LIMPIO", "unit": 1, "price": 6.52, "amount": 6.52, "category": "protein_foods"},
            {"name": "PAPEL VEGETAL 30H", "unit": 1, "price": 1.70, "amount": 1.70, "category": "household"},
            {"name": "BEBIDA AVELLANAS", "unit": 1, "price": 1.30, "amount": 1.30, "category": "beverages"},
            {"name": "INFUSION DORMIR", "unit": 1, "price": 1.05, "amount": 1.05, "category": "beverages"},
            {"name": "LECHE DE COCO", "unit": 1, "price": 1.40, "amount": 1.40, "category": "beverages"},
            {"name": "QUESO UNTAR LIGHT", "unit": 1, "price": 1.35, "amount": 1.35, "category": "dairy"},
            {"name": "RULITO CABRA", "unit": 1, "price": 2.45, "amount": 2.45, "category": "dairy"},
            {"name": "GRIEGO LIGERO", "unit": 1, "price": 1.65, "amount": 1.65, "category": "dairy"},
            {"name": "BOLSA PLASTICO", "unit": 1, "price": 0.15, "amount": 0.15, "category": "household"}
        ],
        "total": 43.95,
        "number_items": 15,
        "payment_method": "tarjeta"
    }

    # The sample receipt texts (these are lists of strings) used as examples
    receipt_texts_1 = [
        'HiperDino',
        'Las mcjores precios de Canarias',
        'DINOSOL SUPERMERCADOS. S.L',
        'C.I.F.B61742565',
        '9238-SD BERNARD0 DE LA T0RRE',
        'Te1éfono:928493638',
        'Centro Vend. Documento',
        'Fecha',
        'Hora',
        '9238 7868352024/923813-0006086615/04/2024 16:01',
        'ARTICULO',
        'IMPORTE',
        'FRESA TARRINA 500 GR',
        '1,59',
        'HIPERDINO ACEITUNA R/ANCHOA LATA 350',
        '0,95',
        'DESPERADOS CERVEZA TOQUE TEQUILA BOT',
        '1,05',
        'HIPERDINO CENTRO JAMON SERRANO BODEG',
        '0.310x13,62€/kg',
        '4,22',
        'MONTESANO JAMON COCIDO SELECCION KG',
        '0,308 x 8,74 €/kg',
        'Dto.0,54€',
        '2,15',
        'Total Articulos: 5',
        'TOTAL COMPRA:',
        '9,96',
        'Detalle de pagos',
        'EFECTIVO',
        '0,00',
        'TARJETA CREDITO',
        '9,96',
        'EMPLEAD0:12789.TICKET_P.E.203659',
        'HORA:160142',
        'FECHA-15/04/2024',
        'IMP0RTE9,96',
        'TARJETAxxxxxxxx*xxx5597',
        '087663',
        'CAPTURA CHIP / AUTORIZACION:',
        'LABEL: Mastercard',
        'ARC: 00',
        'ATC:004F',
        'AID:A0000000041010',
        'AUTENTICACION: Contact1ess EMV',
        'DCC INTERNACIONAL/REDSYS PCI',
        'COM. PE: 154197156',
        'TER. PE: 00000001',
        'SES. PE:15042024001'
    ]

    receipt_texts_2 = [
        'SPAR TAFIRA',
        'C/.BRUNO NARANJO DIAZ9A-B',
        'TLF.:928351616-FAX:928351004',
        'NIFB02868248',
        'SUPERMERCAD0S DABEL2021,S.L',
        'TAFIRA BAJA',
        'FACTURA SIMPLIFICADA',
        'Nro.014002-18965',
        'Fecha:06-04-202415:23',
        'Cajerc:10074',
        'CANT.',
        'PVP IMPORTE',
        'DESCRIPCION',
        '1,49',
        '1,49',
        'CLIPPER MANZ.1.5L.',
        '1',
        '1,40',
        '1,99',
        'PLATANO PRIMERA GRAN',
        '2,79',
        '2,99',
        '2.99',
        'MANZANA PINK LADY GR',
        '3,10',
        '3,10',
        'SALSA.BARI.PES.GEN.1',
        '1,85',
        '1,85',
        'GOFIO B.LUGAR MIL.FU',
        '1',
        '1,75',
        '1,75',
        'ZUM.DISF.D.SIMON PIN',
        '1',
        '1,15',
        '1,15',
        'LECHE.GRNJ.FLR.UHT.',
        '1',
        'Lineas : 7',
        'Total F',
        '15,12',
        '"TARJETA',
        '15.12',
        'Entregado',
        'Cambio',
        '0,00',
        'Operacion',
        ': VENTA',
        '06/04/202415:24',
        'Fecha',
        'Comercio',
        '249060518',
        'ARC',
        '00',
        'A0000000031010',
        'AID',
        'Visa DEBIT',
        'App Labe1',
        '**761',
        'Tarjeta',
        '15,12EUR',
        'Importe',
        '-Copia para al'
    ]

    receipt_texts_4 = [
        'S.A.',
        'MERCADONA.',
        'A-46103834',
        'AVDA. PINTOR FELO MONZON (C.C. 7 PALMAS)',
        'S/N',
        '35019 LAS PALMAS DE GRAN CANARIA',
        '928411755',
        'TELEFONO:',
        '03/04/202421:220P:144041',
        'FACTURA SIMPLIFICADA:2185-013-6970Z2',
        'Imp.)',
        'P.Unit',
        'Descripción',
        '3,30',
        '1 DETERG HIPO COLONIA',
        '13,50',
        '4,50',
        '3 SOLOMILLO POLLO CONG',
        '2,32',
        '1 JAMONCITO BARBACOA',
        '2,76',
        '1 JAMONCITO BARBACOA',
        '2,00',
        '1 NUEZ NATURAL',
        '1,25',
        '2,50',
        '2 QUESU COTIAGE',
        '6,52',
        '1 POLLO ENTERO LIMPIO',
        '1,70',
        '1 PAPEL VEGETAL 30H',
        '1.30',
        '1 BEBIDA AVELLANAS',
        '1,05',
        '1 INFUSION DORMIR',
        '1,40',
        '1 LECHE DE COCO',
        '1,35',
        '1 QUESO UNTAR LIGHT',
        '1 RULITO CABRA',
        '2,45',
        '1 GRIEGO LIGERO',
        '1,65',
        '1 BOLSA PLASTICO',
        '0,15',
        'TOTAL @)',
        '43,95',
        'TARJETA BANCARIA',
        '43,95',
        'COMERCIANTE MINORISTA',
        'TARJBANCARIA',
        '**915',
        'N.C072850332',
        'AUT:1LPOXG',
        'AIDA0000000041010',
        'ARC:3030',
        ')',
        'Importe43,95',
        'DEBIT MASTERCARD'
    ]

    # Initialize the model
    structured_llm = get_model(api_key)
    examples_cat = [
        {"input": f"{receipt_texts_1}", "output": f"{example_cat_1}"},
        {"input": f"{receipt_texts_2}", "output": f"{example_cat_2}"},
        {"input": f"{receipt_texts_4}", "output": f"{example_cat_4}"}
    ]

    example_prompt = ChatPromptTemplate.from_messages([
        ("human", "{input}"),
        ("ai", "{output}"),
    ])

    few_shot_prompt_cat = FewShotChatMessagePromptTemplate(
        example_prompt=example_prompt,
        examples=examples_cat,
    )

    # (The following line is optional if you want to see the formatted prompt)

    few_shot_prompt_cat.format()

    system_message_cat = (
        "You are POS receipt data expert, parse, detect, recognize and convert the receipt OCR image result "
        "into a structured receipt data object. Next, assign a category to each item. Don't make up any value not "
        "in the Input. Output must be a well-formed JSON object."
    )

    final_prompt_cat = ChatPromptTemplate.from_messages([
        ("system", "{system_message}"),
        few_shot_prompt_cat,
        ("human", "{input}"),
    ])

    chain = final_prompt_cat | structured_llm

    # Invoke the chain for each text and collect the output objects
    structured_receipts = []
    for text in texts:
        output = chain.invoke({"system_message": system_message_cat, "input": text})
        # If the output is a JSON string, parse it into a dictionary.
        if isinstance(output, str):
            try:
                output = json.loads(output)
            except json.JSONDecodeError as e:
                print("Error parsing JSON output:", e)
        structured_receipts.append(output)

    # Return the list of structured receipt objects
    return structured_receipts


# # List of image file paths
# image_files = ['abc.jpg']  # Replace with your actual image file(s)
#
# # Step 1: Extract text from the image(s)
# texts = extract_text_from_images(image_files)
#
# # Step 2: Process the text using your structured_output function.
# # Replace 'your_openai_api_key' with your actual API key.
# api_key = 'your_openai_api_key'  # Use environment variable or config file instead
# df = structured_output(texts, api_key)
#
# # Print the resulting DataFrame
# print(df)