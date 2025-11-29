"""
Wallet utility for creating blockchain wallets
"""
import secrets
from eth_account import Account

def create_wallet():
    """
    Create a new Ethereum wallet
    Returns:
        dict: Contains address and private_key
    """
    # Generate a random private key
    private_key = "0x" + secrets.token_hex(32)
    
    # Create account from private key
    account = Account.from_key(private_key)
    
    return {
        "address": account.address,
        "private_key": private_key  # In production, encrypt this before storing
    }

