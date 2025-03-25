import { v4 as uuidv4 } from "uuid";
import express from "express";
const app = express();
app.use(express.json());

let users = [
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

app.get("/users", (req, res) => {
  res.status(200).json({ messsage: users });
});

app.post("/users/create", (req, res) => {
  const { user, password, email } = req.body;
  const userJson = {
    id: uuidv4(),
    user,
    password,
    email,
  };

  console.log(user, password, email);
  if (user && password && !userExists(email)) {
    users.push(userJson);
    return res
      .status(201)
      .json({ message: "user created successfully", userJson, users });
  } else {
    return res.status(200).json({
      message:
        "Não foi possível criar o seu usuário. Verifique as informações e tente novamente.",
    });
  }
});

app.put("/users/change", (req, res) => {
  let { user, password, email } = req.body;

  if (password && email && user) {
    users.filter((userItem) => {
      if (userItem.user == user) {
        userItem.email = email;
        userItem.password = password;
      }
    });

    return res.status(200).json({
      message: "Informações atualizadas com sucesso!",
      password,
      email,
    });
  } else {
    return res.status(200).json({
      message:
        "Não foi possível concluir a operação. Verifique as informações e tente novamente.",
    });
  }
});

app.delete("/users/delete", (req, res) => {
  const { user } = req.body;

  const userExists = users.some((userItem) => userItem.user == user);

  console.log(userExists);
  if (userExists) {
    users = users.filter(userItem => userItem.user !== user);

    return res.status(200).json({ message: "Usuário excluido com sucesso!", users });
  }

  return res
    .status(200)
    .json({ message: "Nenhum usuário foi encontrado. Tente novamente." });
});

function userExists(email) {
  return users.some((user) => user.email == email);
}

app.listen(4000);

// GET => Buscar informação no back-end
// POST => Criar informação no back-end
// PUT / PATCH => Alterar/Atualizar informação no back-end
// DELETE => Deletar informação no back-end
