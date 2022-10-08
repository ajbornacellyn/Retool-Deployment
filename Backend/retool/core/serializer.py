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
        fields = ['first_name', 'email', 'password']

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class ManteinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = mantenimiento
        fields = ['id', 'car', 'taller', 'encargado', 'repuesto', 'factura']

class CarroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carro
        fields = ['id', 'marca', 'modelo', 'placa', 'propietario']

class PropietarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propietario
        fields = ['id', 'nombre', 'apellido', 'telefono']

class tallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = taller
        fields = ['id', 'nombre', 'direccion', 'telefono']

class encargadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = encargado
        fields = ['id', 'nombre', 'apellido', 'telefono']
        