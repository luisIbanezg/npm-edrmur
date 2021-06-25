const regions = [
  { code: "01", name: "Tarapacá" },
  { code: "02", name: "Antofagasta" },
  { code: "03", name: "Atacama" },
  { code: "04", name: "Coquimbo" },
  { code: "05", name: "Valparaíso" },
  { code: "06", name: "Libertador General Bernardo O'Higgins" },
  { code: "07", name: "Maule" },
  { code: "08", name: "Biobío" },
  { code: "09", name: "La Araucanía" },
  { code: "10", name: "Los Lagos" },
  { code: "11", name: "Aysén del General Carlos Ibáñez del Campo" },
  { code: "12", name: "Magallanes y de la Antártica Chilena" },
  { code: "13", name: "Metropolitana de Santiago" },
  { code: "14", name: "Los Ríos" },
  { code: "15", name: "Arica y Parinacota" },
  { code: "16", name: "Ñuble" }
];

const cities = {
  "00": [],
  "01": [],
  "02": [],
  "03": [],
  "04": [],
  "05": [
    { code: "051", name: "Valparaiso" },
    { code: "052", name: "Isla de Pascua" }
  ],
  "06": [],
  "07": [],
  "08": [],
  "09": [],
  "10": [],
  "11": [],
  "12": [],
  "13": [
    { code: "131", name: "Santiago" },
    { code: "132", name: "Cordillera" },
    { code: "133", name: "Chacabuco" },
    { code: "134", name: "Maipo" },
    { code: "135", name: "Melipilla" },
    { code: "136", name: "Talagante" }
  ],
  "14": [],
  "15": [],
  "16": []
};

const districts = {
  "000": [],
  "051": [
    { code: "05101", name: "Valparaíso" },
    { code: "05102", name: "Casablanca" },
    { code: "05103", name: "Concón" }
  ],
  "052": [{ code: "05201", name: "Isla de Pascua" }],
  "131": [
    { code: "13101", name: "Santiago" },
    { code: "13102", name: "Cerrillos" },
    { code: "13103", name: "Cerro Navia" },
    { code: "13104", name: "Conchalí" }
  ]
};

export default {
  regions,
  city(key, defaultValue = "00") {
    return cities.hasOwnProperty(key) ? cities[key] : cities[defaultValue];
  },
  district(key, defaultValue = "000") {
    return districts.hasOwnProperty(key)
      ? districts[key]
      : districts[defaultValue];
  }
};
