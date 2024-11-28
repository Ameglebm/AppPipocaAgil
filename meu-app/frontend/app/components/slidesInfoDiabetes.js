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
    typeOne: "Tipo 1", // Tipos de Diabetes
    typeTwo: "Tipo 2",
    typeThree: "Gestacional",
    typeFour: "LADA",
    typeFive: "MODY",
    typeSix: "Diabetes Secundário",
    typeSeven: "Pré-diabetes",
    typeEight: "Não tenho diabetes",
  },
  {
    id: "2",
    title: "Administração de Insulina",
    height: 360,
    typeOne: "Seringa",
    typeTwo: "Caneta",
    typeThree: "Caneta Inteligente",
    typeFour: "Bomba",
    typeFive: "Injetor de Insulina (Patch)",
    typeSix: "Não uso Insulina",
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
