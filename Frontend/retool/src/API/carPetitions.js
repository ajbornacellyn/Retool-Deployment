import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
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
    try{
        const res = await axios.get("https://retool.up.railway.app/car/", {});
        state(res.data);
    }catch(err){
        state([]);
    }
}

export const deleteVehicle = async (vehicle,updateVehicles) => {
    await axios.delete("https://retool.up.railway.app/car/", {
        data: {"placa": vehicle.placa}
    }).then((res) => {
        updateVehicles();
        if (res.data.message != "Car deleted"){
            alert("Vehiculo no eliminado.");
        }
    }
)
}

export const createVehicle = async (vehicle,updateVehicles) => {
    await axios.post("https://retool.up.railway.app/car/", {
          placa: vehicle.placa,
          marca: vehicle.marca,
          modelo: vehicle.modelo,
          año: vehicle.año,
          motor: vehicle.motor,
          combustible: vehicle.combustible,
          kilometraje: vehicle.kilometraje,}       
        ).then((res) => {
            updateVehicles();
            if (res.data.message === "Car already exists"){
                alert("Vehiculo ya registrado.");
            }
        }
    )
}

export const editVehicle = async (placa,vehicle,updateVehicles) => {
    await axios.put("https://retool.up.railway.app/car/"+placa+"/", {
        placa: vehicle.placa,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        año: vehicle.año,
        combustible: vehicle.combustible,
        kilometraje: vehicle.kilometraje,
    }).then((res) => {
        updateVehicles();
        if (res.data.response != "Vehiculo actualizado"){
            alert("Error al actualizar vehiculo.");
        }
    })
}

export const updateVehicleKm = async (vehicle,updateVehicles) => {
    await axios.put("https://retool.up.railway.app/carUpdateKm/"+vehicle.placa+"/", {
        placa: vehicle.placa,
        kilometraje: vehicle.kilometraje,
    }).then((res) => {
        updateVehicles();
        if (res.data === "Vehiculo no encontrado"){
            alert("Vehiculo no encontrado");
        }
    }
    )
}

