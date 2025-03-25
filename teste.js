const users = [
  {
    id: 1,
    user: "vitto2",
    password: "44252",
    email: "vitor2071@gmail.com",
  },
  {
    id: 2,
    user: "maria_silva",
    password: "senha123",
    email: "maria.silva@gmail.com",
  },
  {
    id: 3,
    user: "joao_santos",
    password: "12345",
    email: "joao.santos@hotmail.com",
  },
  {
    id: 4,
    user: "ana_oliveira",
    password: "67890",
    email: "ana.oliveira@yahoo.com",
  },
  {
    id: 5,
    user: "pedro_costa",
    password: "54321",
    email: "pedro.costa@outlook.com",
  },
];

const userExists = users.some((userItem) => {
  console.log(userItem.user);

  return userItem.user == "maria_silva";
});

console.log(userExists);
