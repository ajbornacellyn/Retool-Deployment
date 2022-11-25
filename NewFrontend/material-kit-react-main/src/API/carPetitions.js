import axios from "axios";
import Router from "next/router";

/*axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        config.headers.Authorization = (token != null) ? `Token ${token}` : null;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/

export const getVehicles = async (state) => {
    const res = await axios.get("http://localhost:8000/car/", {
    });
    state(res.data);
}

export const deleteVehicle = async (vehicle) => {
    axios
      .delete("http://127.0.0.1:8000/car/", {
        data: {"placa": vehicle.placa}
    }).then((res) => {
        if (res.data.message === "Car deleted"){
            alert("Car deleted");
            Router.reload();
        }else{
            alert("Car not deleted");
        }
    }
)
}

export const createVehicle = async (vehicle) => {
    axios
      .post("http://localhost:8000/car/", {
          placa: vehicle.placa,
          marca: vehicle.marca,
          modelo: vehicle.modelo,
          motor: vehicle.motor,
          combustible: vehicle.combustible,
          kilometraje: vehicle.kilometraje,}       
        ).then((res) => {
            if (res.data.message === "Car already exists"){
                alert("Car already exists");
            }else{
                alert("Vehiculo creado");
                Router.push('/');
            }
        }
    )
}

export const editVehicle = async (placa, vehicle) => {
    axios
    .put("http://127.0.0.1:8000/car/"+placa+"/", {
        placa: vehicle.placa,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        combustible: vehicle.combustible,
        kilometraje: vehicle.kilometraje,
    })

}

export const updateVehicleKm = async (vehicle) => {
    axios
    .put("http://127.0.0.1:8000/carUpdateKm/"+vehicle.placa+"/", {
        placa: vehicle.placa,
        kilometraje: vehicle.kilometraje,
    }).then((res) => {
        if (res.data === "Vehiculo no encontrado"){
            alert("Vehiculo no encontrado");
        }else{
            alert(res.data.response);
            //Router.reload();
        }
    }
    )
}

