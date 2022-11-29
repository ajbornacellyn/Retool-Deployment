import axios from "axios";


export const getReminders = async (state) => {
    try{
        const res = await axios.get("https://retool.up.railway.app/reminder/", {});
        if(res.data.message != "OK"){
            state(res.data.message);
        }else{
            state(res.data.Reminders);
        }
        
    }catch(err){
        state([]);
    }
}

export const createReminder = async (reminder,updateReminders) => {
    await axios.post("https://retool.up.railway.app/reminder/", {
          placa: reminder.placa,
          descripcion: reminder.descripcion,
          kilometraje: reminder.kilometraje,
          estado: reminder.estado,
          fecha: reminder.fecha,
          detalle: reminder.detalle,}       
        ).then((res) => {
            updateReminders();
            if (res.data.message != "Maintenance created"){
                alert("Vehiculo ya registrado.");
            }
        }
    )
}

export const deleteReminder = async (reminder,updateReminders) => {
    await axios.delete("https://retool.up.railway.app/reminder/", {
        data: {"id": reminder.id}
    }).then((res) => {
        updateReminders();
        if (res.data.message != "Reminder deleted"){
            alert("Recordatorio no eliminado.");
        }
    }
)
}

export const editReminder = async (reminder,updateReminders) => {
    console.log(reminder)
    const id = reminder.id;
    await axios.put("https://retool.up.railway.app/reminder/"+id+"/", {
        placa: reminder.placa,
        descripcion: reminder.descripcion,
        kilometrajeInicial: reminder.kilometrajeInicial,
        kilometraje: reminder.kilometraje,
        estado: reminder.estado,
        fecha: reminder.fecha,
        detalle: reminder.detalle,
    }).then((res) => {
        updateReminders();
        if (res.data.message != "Reminder updated"){
            alert("Error al actualizar vehiculo.");
        }
    })
}

