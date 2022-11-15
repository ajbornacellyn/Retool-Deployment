from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
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
        serializer = RegisterSerializer(data=request.data)
        if User.objects.filter(username=request.data['username']).exists():
            return Response({"message": "Username already exists"})
        else:
            if serializer.is_valid(raise_exception=True):
                User.objects.create_user(username=request.data['username'], password=request.data['password'])
                return  Response({"message": "User created successfully"})

            
        

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
    permission_classes = [IsAuthenticated]
    def post(self, request):            
        serializer = ManteinanceSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            cars = Carro.objects.filter(placa=request.data['placa'])
            if len(cars) > 0:
                auto = Carro.objects.get(placa=request.data['placa'])
                mantenimiento.objects.create( placa= auto, descripcion=request.data['descripcion'], kilometraje=request.data['kilometraje'], estado=request.data['estado'], servicio=request.data['servicio'], fecha = request.data['fecha'], costo = request.data['costo'])
                return  Response({"message": "Maintenance created successfully"})
            else:
                return Response("Car not found")
        else:
            return  Response("Invalid Mantence")

    def get(self, request):
        current_user = request.user
        cars = Carro.objects.filter(user=current_user.id)
        maintenances = []
        if len(cars) > 0:
            for car in cars:
                mant = mantenimiento.objects.filter(placa=car)
                if len(mant) > 0:
                    for m in mant:
                        serializer = ManteinanceSerializer2(m)
                        maintenances.append(serializer.data)
            if len (maintenances) > 0:
                return Response(maintenances)
            else:
                return Response("Not maintenances")
        else:
            return Response("No cars")

    def delete(self, request):
        idMant = request.data['id']
        mant = mantenimiento.objects.filter(id = idMant)
        if len(mant) > 0:
            mant = mantenimiento.objects.get(id = idMant)
            mant.delete()
            return Response({ "message": "Maintenance deleted" })
        else:
            return Response({ "message": "Maintenance not deleted" })

        

class CarView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        current_user = request.user
        serializer = CarSerializer(data=request.data)
        if Carro.objects.filter(placa=request.data['placa']).exists():
            return Response({"message": "Car already exists"})
        else: 
            if serializer.is_valid(raise_exception=True):
                Carro.objects.create(placa= request.data['placa'], user = current_user, marca = request.data['marca'], modelo = request.data['modelo'], combustible = request.data['combustible'], kilometraje = request.data['kilometraje'])
                return  Response({"message": "Car created successfully"})
            else:
                return  Response("Invalid Car")

    def get(self, request):
        current_user = request.user
        cars = Carro.objects.filter(user=current_user.id)
        if len(cars) > 0:
            detail = [ {"placa": detail.placa, "marca":detail.marca, "modelo": detail.modelo, "color:": detail.color , "año": detail.año, "combustible": detail.combustible, "kilometraje": detail.kilometraje, "descripcion": detail.descripcion, "transmision": detail.transmision, "carroceria": detail.carroceria, "motor": detail.motor, "cilindraje": detail.cilindraje} 
            for detail in cars]
            return Response(detail)

        else:
            return Response("No cars")

    def put(self, request, placa):
        cars = Carro.objects.filter(placa = placa)
        if len(cars) > 0:
            carro = Carro.objects.get(placa = placa)
            carro.marca = request.data['marca']
            carro.modelo = request.data['modelo']
            carro.kilometraje = request.data['kilometraje']
            carro.combustible = request.data['combustible']
            carro.save()
            return Response({"response": "Carro actualizado",
            "placa":carro.placa, "marca": carro.marca, "modelo": carro.modelo, "kilometraje": carro.kilometraje, "combustible": carro.combustible})
        else:
            return Response("Carro no encontrado")

    def delete(self, request):
        placa = request.data['placa']
        cars = Carro.objects.filter(placa = request.data['placa'])
        if len(cars) > 0:
            carro = Carro.objects.get(placa = placa)
            carro.delete()
            return Response({ "message": "Car deleted" })
        else:
            return Response({ "message": "Car not found" })


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

