from langchain.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate
from langchain_openai import ChatOpenAI
import json

def get_model(api_key):
    model = ChatOpenAI(model="gpt-3.5-turbo-0125", api_key=api_key)
    structured_llm = model.with_structured_output(FlyerInfo)
    return structured_llm

def structured_flyer_output(texts, api_key):
    """
    Process extracted text from flyers and structure it into a list of flyer objects.

    Args:
        texts (list): List of extracted text from flyers.
        api_key (str): OpenAI API key.

    Returns:
        list: List of structured flyer objects.
    """
    # Define examples and prompts
    examples = [
        {
            "input": "Flyer for SuperMart\nAddress: 123 Main St, Cityville\nPhone: 555-1234\n\nProduct: Apples, Price: $1.99, Discount: 10%\nProduct: Bread, Price: $2.49",
            "output": {
                "store": "SuperMart",
                "address": "123 Main St, Cityville",
                "city": "Cityville",
                "products": [
                    {"name": "Apples", "price": 1.99, "discount": 10.0, "original_price": 2.21},
                    {"name": "Bread", "price": 2.49, "discount": None, "original_price": None}
                ]
            }
        }
    ]

    example_prompt = ChatPromptTemplate.from_messages([
        ("human", "{input}"),
        ("ai", "{output}"),
    ])

    few_shot_prompt = FewShotChatMessagePromptTemplate(
        example_prompt=example_prompt,
        examples=examples,
    )

    system_message = (
        "You are a flyer data expert. Parse, detect, recognize, and convert the flyer OCR image result "
        "into a structured flyer data object. Extract the store name, address, city, and list of products "
        "with their prices and discounts (if applicable). Don't make up any value not in the input. "
        "Output must be a well-formed JSON object."
    )

    final_prompt = ChatPromptTemplate.from_messages([
        ("system", "{system_message}"),
        few_shot_prompt,
        ("human", "{input}"),
    ])

    # Initialize the model
    structured_llm = get_model(api_key)
    chain = final_prompt | structured_llm

    # Process each text and collect the output objects
    structured_flyers = []
    for text in texts:
        output = chain.invoke({"system_message": system_message, "input": text})
        if isinstance(output, str):
            try:
                output = json.loads(output)
            except json.JSONDecodeError as e:
                print("Error parsing JSON output:", e)
        structured_flyers.append(output)

    return structured_flyers