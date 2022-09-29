from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
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
            from django.contrib.auth.models import User
            user = User.objects.create_user(request.data['email'], request.data['email'], password=request.data['password'])
            user.first_name = request.data['first_name']
            user.save()
            #serializer.save()
            return  Response(serializer.data)

class LoginView(APIView):
    
    serializer_class = LoginSerializer
  
    def post(self, request):
        
        print(request.data)
        from django.contrib.auth import authenticate
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            # A backend authenticated the credentials
            request.session['member_id'] = user.id
            return  Response(user.username)
        else:
            # No backend authenticated the credentials
            return  Response("")
        

