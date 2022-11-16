import axios from "axios";
import Router from 'next/router';

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


export const getWorkshop = async (state) => {
    const res = await axios.get("http://localhost:8000/taller/", {
    });
    state(res.data);
}

export const createWorkshop = async (workshop) => {
    axios.post("http://localhost:8000/taller/", {
          id: workshop.id,
          nombre: workshop.nombre,
          direccion: workshop.direccion,
          telefono: workshop.telefono,
      }
    ).then((res) => {
        if (res.data.message === "Workshop already exists"){
            alert("Workshop already exists");
        }else{
            alert("Workshop created");
            Router.reload();
        }
    }
)
}

export const deleteWorkshop = async (workshop) => {
    axios
      .delete("http://127.0.0.1:8000/taller/", {
        data: {"id": workshop}
    }).then((res) => {
        if (res.data.message === "Workshop deleted"){
            alert("Workshop deleted");
            Router.reload();
        }else{
            alert("Workshop not deleted");
        }
    }
)
}

export const editWorkshop = async (workshop) => {
    axios
        .post("http://localhost:8000/edit_car/", {
            placa: values.placa,
            marca: values.marca,
            modelo: values.linea,
            año: values.modelo,
            combustible: values.combustible,
            kilometraje: values.kilometraje,
        })
    }




