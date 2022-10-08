from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from django.contrib.auth import authenticate

# Create your views here.
  
class ReactView(APIView):
    
    serializer_class = ReactSerializer
  
    def get(self, request):
        detail = [ {"name": detail.name,"detail": detail.detail} 
        for detail in React.objects.all()]
        return Response(detail)
  
    def post(self, request):
  
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)

class RegisterView(APIView):
    
    serializer_class = RegisterSerializer
  
    def post(self, request):
        
        print(request.data)
        serializer = RegisterSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            user = User.objects.create_user(request.data['username'], request.data['email'], password=request.data['password'])
            user.first_name = request.data['first_name']
            user.save()
            #serializer.save()
            return  Response(serializer.data)

class LoginView(APIView):
    
    serializer_class = LoginSerializer
  
    def post(self, request):
        
        print(request.data)
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            token = Token.objects.get_or_create(user=user)
            return  Response(  { 'token': token[0].key } )
        else:
            # No backend authenticated the credentials
            return  Response("Invalid credentials")


class CreteManteinanceView(APIView):
    
    serializer_class = ManteinanceSerializer
  
    def post(self, request):
        
        print(request.data)
        serializer = ManteinanceSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)
        

