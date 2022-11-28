  
const tiposRecordatorios = [
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
    value: 'Pendiente',
    label: 'Pendiente'
  },
  {
    value: 'Completado',
    label: 'Completado'
  }
];

export function getTiposRecordatiorios() {
    
    return tiposRecordatorios;
    
}

export function getEstados() {
    
  return estados;
  
}