  
const tiposRecordatorios = [
  {
    value: 'Mantenimiento periódico',
    label: 'Mantenimiento periódico',
  },
  {
    value: 'Cambio de aceite',
    label: 'Cambio de aceite'
  },
  {
    value: 'Cambio de neumáticos',
    label: 'Cambio de neumáticos'
  },
  {
    value: 'Cambio de batería',
    label: 'Cambio de batería'
  },
  {
    value: 'Cambio de frenos',
    label: 'Cambio de frenos'
  },
  {
    value: 'Cambio de amortiguadores',
    label: 'Cambio de amortiguadores'
  },
  {
    value: 'Cambio de embrague',
    label: 'Cambio de embrague'
  },
  {
    value: 'Cambio de correa de Bujías',
    label: 'Cambio de correa de  Bujías'
  },
  {
    value: 'Arreglo Motor',
    label: 'Arreglo Motor'
  },
  {
    value: 'Líquido de frenos',
    label: 'Líquido de frenos'
  },
  {
    value: 'Otro servico',
    label: 'Otro servico'
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