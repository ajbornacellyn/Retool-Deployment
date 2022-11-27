from django.contrib import admin
from .models import Carro, Propietario, taller, encargado, repuesto, React, mantenimiento, Recordatorio

# Register your models here.
admin.site.register(Carro)
admin.site.register(Propietario)
admin.site.register(taller)
admin.site.register(encargado)
admin.site.register(repuesto)
admin.site.register(React)
admin.site.register(mantenimiento)
admin.site.register(Recordatorio)
