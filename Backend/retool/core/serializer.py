from rest_framework import serializers
from . models import *
from django.contrib.auth.models import User
  
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class ManteinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = mantenimiento
        fields = ['placa','fecha','descripcion', 'kilometraje','estado', 'servicio', 'costo']

class ManteinanceSerializer2(serializers.ModelSerializer):
    class Meta:
        model = mantenimiento
        fields = ['id','placa','fecha','descripcion', 'kilometraje','estado', 'servicio', 'costo']

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carro
        fields = ['placa', 'marca', 'modelo', 'combustible', 'kilometraje']

class OwnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propietario
        fields = ['Id', 'nombre', 'apellido', 'telefono', 'direccion', 'edad', 'correo']

class TallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = taller
        fields = ['id', 'nombre', 'direccion', 'telefono']


class encargadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = encargado
        fields = ['id', 'nombre', 'apellido', 'telefono']
