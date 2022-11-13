import axios from "axios";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        config.headers.Authorization = `Token ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getVehicles = async (state) => {
    const res = await axios.get("http://localhost:8000/car/", {
    });
    state(res.data);
}

export const deleteVehicle = async (vehicle) => {
    axios
      .delete("http://127.0.0.1:8000/car/", {
        data: {"placa": vehicle.placa}
    })
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
