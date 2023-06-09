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
                User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'])
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
        serializer = ManteinanceSerializerCreate(data=request.data)
        if serializer.is_valid(raise_exception=True):
            cars = Carro.objects.filter(placa=request.data['placa'])
            if len(cars) > 0:
                auto = Carro.objects.get(placa=request.data['placa'])
                mantenimiento.objects.create( placa= auto, descripcion=request.data['descripcion'], kilometraje=request.data['kilometraje'], estado=request.data['estado'], servicio=request.data['servicio'], fecha = request.data['fecha'], costo = request.data['costo'])
                return  Response({"message": "Maintenance created"})
            else:
                return Response({"message": "Vehicle not found"})
        else:
            return  Response({"message": "Invalid Mantence"})

    def get(self, request):
        current_user = request.user
        cars = Carro.objects.filter(user=current_user.id)
        maintenances = []
        if len(cars) > 0:
            for car in cars:
                mant = mantenimiento.objects.filter(placa=car)
                if len(mant) > 0:
                    for m in mant:
                        serializer = ManteinanceSerializer(m)
                        maintenances.append(serializer.data)
            if len (maintenances) > 0:
                return Response({"message": "OK", "Maintenances":maintenances})
            else:
                return Response({"message": "No maintenances"})
        else:
            return Response({"message": "No vehicles"})

    def put(self, request, id):
        mant = mantenimiento.objects.filter(id = id)
        if len(mant) > 0:
            manteni = mantenimiento.objects.get(id = id)
            manteni.descripcion = request.data['descripcion']
            manteni.kilometraje = request.data['kilometraje']
            manteni.estado = request.data['estado']
            manteni.fecha = request.data['fecha']
            manteni.servicio = request.data['servicio']
            manteni.costo = request.data['costo']
            manteni.save()
            return Response({"message": "Maintenance updated", "id":manteni.id, "descripcion": manteni.descripcion, "kilometraje": manteni.kilometraje, "estado": manteni.estado, "fecha": manteni.fecha, "costo": manteni.costo})
        else:
            return Response({"message": "Maintenance not found"})

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
                Carro.objects.create(placa= request.data['placa'], user = current_user, marca = request.data['marca'], año = request.data['año'], modelo = request.data['modelo'], combustible = request.data['combustible'], kilometraje = request.data['kilometraje'])
                return  Response({"message": "Car created successfully"})
            else:
                return  Response("Invalid Car")

    def get(self, request):
        current_user = request.user
        cars = Carro.objects.filter(user=current_user.id)
        if len(cars) > 0:
            detail = [ {"placa": detail.placa, "marca":detail.marca, "año": detail.año, "modelo": detail.modelo, "color:": detail.color , "año": detail.año, "combustible": detail.combustible, "kilometraje": detail.kilometraje, "descripcion": detail.descripcion, "transmision": detail.transmision, "carroceria": detail.carroceria, "motor": detail.motor, "cilindraje": detail.cilindraje} 
            for detail in cars]
            return Response(detail)

        else:
            return Response("No vehicles")

    def put(self, request, placa):
        cars = Carro.objects.filter(placa = placa)
        if len(cars) > 0:
            carro = Carro.objects.get(placa = placa)
            carro.marca = request.data['marca']
            carro.año = request.data['año']
            carro.modelo = request.data['modelo']
            carro.kilometraje = request.data['kilometraje']
            carro.combustible = request.data['combustible']
            carro.save()
            return Response({"response": "Vehiculo actualizado",
            "placa":carro.placa, "marca": carro.marca, "modelo": carro.modelo, "kilometraje": carro.kilometraje, "combustible": carro.combustible})
        else:
            return Response("Vehiculo no encontrado")

    def delete(self, request):
        placa = request.data['placa']
        cars = Carro.objects.filter(placa = request.data['placa'])
        if len(cars) > 0:
            carro = Carro.objects.get(placa = placa)
            carro.delete()
            return Response({ "message": "Car deleted" })
        else:
            return Response({ "message": "Car not found" })


class CarUpdateKmView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, placa):
        cars = Carro.objects.filter(placa = placa)
        if len(cars) > 0:
            carro = Carro.objects.get(placa = placa)
            carro.kilometraje = request.data['kilometraje']
            carro.save()
            return Response({"response": "Kilometraje actualizado",
            "placa":carro.placa, "marca": carro.marca, "modelo": carro.modelo, "kilometraje": carro.kilometraje, "combustible": carro.combustible})
        else:
            return Response("Vehiculo no encontrado")


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

class ReminderView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):            
        serializer = ReminderSerializerCreate(data=request.data)
        if serializer.is_valid(raise_exception=True):
            cars = Carro.objects.filter(placa=request.data['placa'])
            if len(cars) > 0:
                auto = Carro.objects.get(placa=request.data['placa'])
                Recordatorio.objects.create( placa= auto, descripcion=request.data['descripcion'], kilometrajeInicial = auto.kilometraje, kilometraje=request.data['kilometraje'], estado=request.data['estado'], fecha = request.data['fecha'], detalle = request.data['detalle'])
                return  Response({"message": "Maintenance created"})
            else:
                return Response({"message": "Vehicle not found"})
        else:
            return  Response({"message": "Invalid Reminder"})

    def get(self, request):
        current_user = request.user
        cars = Carro.objects.filter(user=current_user.id)
        reminders = []
        if len(cars) > 0:
            for car in cars:
                rem = Recordatorio.objects.filter(placa=car,estado='Pendiente')
                if len(rem) > 0:
                    for r in rem:
                        serializer = ReminderSerializer(r)
                        reminder = serializer.data
                        auto = Carro.objects.get(placa = reminder['placa'])
                        avance = 0 
                        kIni = reminder['kilometrajeInicial']
                        kRem = reminder['kilometraje']
                        kAut = auto.kilometraje
                        if (kAut > kIni):
                            if(kAut >= kRem):
                                avance = 100
                            else:
                                avance = round((kAut-kIni) / (kRem-kIni) * 100)
                        reminder['avance'] = avance
                        reminders.append(reminder)
            if len (reminders) > 0:
                return Response({"message": "OK", "Reminders":reminders})
            else:
                return Response({"message": "No reminders"})
        else:
            return Response({"message": "No vehicles"})

    def put(self, request, id):
        rec = Recordatorio.objects.filter(id = id)
        if len(rec) > 0:
            recordatorio = Recordatorio.objects.get(id = id)
            recordatorio.descripcion = request.data['descripcion']
            recordatorio.kilometrajeInicial = request.data['kilometrajeInicial']
            recordatorio.kilometraje = request.data['kilometraje']
            recordatorio.estado = request.data['estado']
            recordatorio.fecha = request.data['fecha']
            recordatorio.detalle = request.data['detalle']
            recordatorio.save()
            return Response({"message": "Reminder updated", "id":recordatorio.id, "descripcion": recordatorio.descripcion, "kilometraje": recordatorio.kilometraje, "estado": recordatorio.estado, "fecha": recordatorio.fecha, "detalle": recordatorio.detalle})
        else:
            return Response({"message": "Reminder not found"})

    def delete(self, request):
        idRec = request.data['id']
        rec = Recordatorio.objects.filter(id = idRec)
        if len(rec) > 0:
            rec = Recordatorio.objects.get(id = idRec)
            rec.delete()
            return Response({ "message": "Reminder deleted" })
        else:
            return Response({ "message": "Reminder not deleted" })