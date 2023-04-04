import axios from "axios";


export const getMaintenances = async (state) => {
    try{
        const res = await axios.get("https://retool-production.up.railway.app/maintenance/", {});
        if(res.data.message != "OK"){
            state(res.data.message);
        }else{
            state(res.data.Maintenances);
        }
        
    }catch(err){
        state([]);
    }
}

export const createMaintenance = async (maintenance,updateMaintenances) => {
    await axios.post("https://retool-production.up.railway.app/maintenance/", {
          placa: maintenance.placa,
          descripcion: maintenance.descripcion,
          kilometraje: maintenance.kilometraje,
          estado: maintenance.estado,
          fecha: maintenance.fecha,
          servicio: maintenance.servicio,
          costo: maintenance.costo,}       
        ).then((res) => {
            updateMaintenances();
            if (res.data.message != "Maintenance created"){
                alert("Vehiculo ya registrado.");
            }
        }
    )
}

export const deleteMaintenance = async (maintenance,updateMaintenances) => {
    await axios.delete("https://retool-production.up.railway.app/maintenance/", {
        data: {"id": maintenance.id}
    }).then((res) => {
        updateMaintenances();
        if (res.data.message != "Maintenance deleted"){
            alert("Recordatorio no eliminado.");
        }
    }
)
}

export const editMaintenance = async (maintenance,updateMaintenances) => {
    console.log(maintenance)
    const id = maintenance.id;
    await axios.put("https://retool-production.up.railway.app/maintenance/"+id+"/", {
        placa: maintenance.placa,
        descripcion: maintenance.descripcion,
        kilometraje: maintenance.kilometraje,
        estado: maintenance.estado,
        fecha: maintenance.fecha,
        servicio: maintenance.servicio,
        costo: maintenance.costo,
    }).then((res) => {
        updateMaintenances();
        if (res.data.message != "Maintenance updated"){
            alert("Error al actualizar vehiculo.");
        }
    })
}

