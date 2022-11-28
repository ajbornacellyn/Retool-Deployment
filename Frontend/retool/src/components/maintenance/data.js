  
const tiposServicios = [
  {
    value: 'Cambio aceite',
    label: 'Cambio aceite'
  },
  {
    value: 'Cambio llantas',
    label: 'Cambio llantas'
  },
  {
    value: 'Mantenimiento periodico',
    label: 'Mantenimiento periodico'
  }
];

const estados = [
  {
    value: 'En proceso',
    label: 'En proceso'
  },
  {
    value: 'Finalizado',
    label: 'Finalizado'
  },
  {
    value: 'Aplazado',
    label: 'Aplazado'
  }
];

export function getTiposServicios() {
    
    return tiposServicios;
    
}

export function getEstados() {
    
  return estados;
  
}