from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
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
            user.save()
            #serializer.save()
            return  Response(serializer.data)

class LoginView(APIView):
    
    serializer_class = LoginSerializer
    print(BasicAuthentication.authenticate_credentials)

    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            token = Token.objects.get_or_create(user=user)
            return  Response(  { 'token': token[0].key } )
        else:
            # No backend authenticated the credentials
            return  Response("Invalid credentials")


class ManteinanceView(APIView):
    def post(self, request):            
        serializer = ManteinanceSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            auto = Carro.objects.get(placa=request.data['placa'])
            mant = mantenimiento.objects.create( placa= auto, descripcion=request.data['descripcion'], kilometraje=request.data['kilometraje'], estado=request.data['estado'], servicio=request.data['servicio'], nota=request.data['nota'])
            mant.save()
            return  Response(serializer.data)
        else:
            return  Response("Invalid Mantence")

    def get(self, request):
        manteinences = mantenimiento.objects.all()
        if len(manteinences) > 0:
            detail = [ {"id": detail.id,"descripcion": detail.descripcion,"kilometraje": detail.kilometraje, "estado": detail.estado,"servicio": detail.servicio, "nota": detail.nota, "car": detail.car, "taller": detail.taller, "encargado": detail.encargado, "repuesto": detail.repuesto, "factura": detail.factura} 
            for detail in manteinences]
            return Response(detail)

        else:
            return Response("No manteinences")
class CarView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        current_user = request.user
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            carro = Carro.objects.create(placa= request.data['placa'], user = current_user, marca = request.data['marca'], modelo = request.data['modelo'], color = request.data['color'], año = request.data['año'], combustible = request.data['combustible'], kilometraje = request.data['kilometraje'], descripcion = request.data['descripcion'], transmision = request.data['transmision'],carroceria = request.data['carroceria'], motor = request.data['motor'], cilindraje = request.data['cilindraje'])
            carro.save()
            return  Response(serializer.data)
        else:
            return  Response("Invalid Car")

    def get(self, request):
        #user = SessionAuthentication().authenticate(request)[0]
        #usuario= User.objects.get(username=user)
        current_user = request.user
        cars = Carro.objects.filter(user=current_user.id)
        if len(cars) > 0:
            detail = [ {"placa": detail.placa, "marca":detail.marca, "modelo": detail.modelo, "color:": detail.color} 
            for detail in cars]
            return Response(detail)

        else:
            return Response("No cars")
        


class OwnerView(APIView):

    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = OwnSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            Prop = Propietario.objects.create(Id = request.data['Id'], nombre = request.data['nombre'], apellido = request.data['apellido'], telefono = request.data['telefono'],edad = request.data['edad'], correo = request.data['correo'])
            Prop.save()
            return  Response(serializer.data)
        else:
            return  Response("Invalid Owner")

    def get(self, request):
        owns = Propietario.objects.all()
        if len(owns) > 0:
            detail = [ {"Id": detail.Id,"nombre": detail.nombre,"apellido": detail.apellido, "telefono": detail.telefono, "edad": detail.edad, "correo": detail.correo}
            for detail in owns]
            return Response(detail)

        else:
            return Response("No owns")

class TallerView(APIView):
    def post(self, request):
        serializer = TallerSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)
        else:
            return  Response("Invalid Taller")

    def get(self, request):
        tallers = taller.objects.all()
        if len(tallers) > 0:
            detail = [ {"id": detail.id,"nombre": detail.nombre,"direccion": detail.direccion, "telefono": detail.telefono} 
            for detail in tallers]
            return Response(detail)

        else:
            return Response("No tallers")


