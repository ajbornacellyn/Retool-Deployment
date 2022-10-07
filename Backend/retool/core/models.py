import code
from django.db import models

# Create your models here.


class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)


# class owner with properties

class Propietario(models.Model):
    Id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    telefono = models.CharField(max_length=30)
    direccion = models.CharField(max_length=30)
    edad = models.IntegerField()
    correo = models.CharField(max_length=30)


class taller(models.Model):
    codigo = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=30)
    direccion = models.CharField(max_length=30)
    telefono = models.CharField(max_length=30)
    correo = models.CharField(max_length=30)


class encargado(models.Model):
    Id = models.IntegerField(primary_key=True)
    tallerId = models.ForeignKey(taller, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    telefono = models.CharField(max_length=30)
    correo = models.CharField(max_length=30)

# class vehicle with properties


class Carro(models.Model):
    placa = models.CharField(max_length=30, primary_key=True)
    propietarioId = models.ForeignKey(Propietario, on_delete=models.CASCADE)
    tallerId = models.ForeignKey(taller, on_delete=models.CASCADE)
    marca = models.CharField(max_length=30)
    modelo = models.CharField(max_length=30)
    color = models.CharField(max_length=30)
    combustible = models.CharField(max_length=30)
    kilometraje = models.IntegerField()
    descripcion = models.CharField(max_length=500)
    transmision = models.CharField(max_length=30)
    carroceria = models.CharField(max_length=30)
    motor = models.CharField(max_length=30)
    cilindraje = models.IntegerField()


class repuesto(models.Model):
    id = models.IntegerField(primary_key=True)
    tipo = models.CharField(max_length=30)
    marca = models.CharField(max_length=30)
    referencia = models.CharField(max_length=30)
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=500)
    precio = models.IntegerField()
    cantidad = models.IntegerField()


class mantenimiento(models.Model):
    codigo = models.IntegerField(primary_key=True)
    placa = models.ForeignKey(Carro, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=500)
    kilometraje = models.IntegerField()
    estado = models.CharField(max_length=30)
    servicio = models.CharField(max_length=30)
    nota = models.CharField(max_length=500)


class factura(models.Model):
    id = models.IntegerField(primary_key=True)
    fecha = models.DateField()
    mantenimientoId = models.ForeignKey(
        mantenimiento, on_delete=models.CASCADE)
    fecha = models.DateField()
    costo = models.IntegerField()
    descripcion = models.CharField(max_length=500)


class Taller_Carro(models.Model):
    tallerId = models.ForeignKey(taller, on_delete=models.CASCADE)
    placa = models.ForeignKey(Carro, on_delete=models.CASCADE)
    propietarioId = models.ForeignKey(Propietario, on_delete=models.CASCADE)
