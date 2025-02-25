/*
- Este arquivo age como uma fonte de dados (data provider) para as telas do carrossel.  
- Ele organiza todas as informações e elementos necessários para construir cada tela do carrossel de forma dinâmica.
- Cada id deste array possue um arquivo js que renderiza sua respectivas telas, por exemplo ID=1 => tipoDiabetesItem.js
*/
export default [
  {
    id: "1",
    title: "Tipo de Diabetes", // Titulo da tela
    height: 455, // Altura
    types: [
      {id: 1, name: "Tipo 1"}, // Tipos de Diabetes
      {id: 2, name:  "Tipo 2"},
      {id: 3, name:  "Gestacional"},
      {id: 4, name:  "LADA"} ,
      {id: 5, name: "MODY"},
      {id: 6, name: "Diabetes Secundário"},
      {id: 7, name: "Pré-diabetes"},
      {id: 8, name: "Não tenho diabetes"},
    ]
  },
  {
    id: "2",
    title: "Administração de Insulina",
    height: 360,
    types: [
      { id: 1, name: "Seringa" },
      { id: 2, name: "Caneta" },
      { id: 3, name: "Caneta Inteligente" },
      { id: 4, name: "Bomba" },
      { id: 5, name: "Injetor de Insulina (Patch)" },
      { id: 6, name: "Não uso Insulina" },
    ],
  },
  {
    id: "3",
    title: "Meta glicêmica",
    description:
      "A meta glicêmica é o valor recomendado de glicose no sangue, definido pelo seu médico.",
  },
  {
    id: "4",
    title: "Medicamentos",
  },
  {
    id: "5",
    title: "Tipo de Insulina",
  },
];