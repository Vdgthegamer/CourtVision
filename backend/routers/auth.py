"""
Auth router — handles sign up and sign in endpoints.
In the full version, these calls go to Supabase Auth.
"""
from fastapi import APIRouter
from models.schemas import SignUpRequest, SignInRequest

router = APIRouter()

@router.post("/signup")
def signup(body: SignUpRequest):
    # TODO: call supabase.auth.sign_up(email, password)
    return {"message": "Signup route ready — connect Supabase to activate."}

@router.post("/signin")
def signin(body: SignInRequest):
    # TODO: call supabase.auth.sign_in_with_password(email, password)
    return {"message": "Signin route ready — connect Supabase to activate."}
