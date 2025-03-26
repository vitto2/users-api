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
  res.status(200).json({ users });
});

const userExists = (req, res, next) => {
  const { user, email } = req.body;
  const findUser = users.some((userName) => userName.user == user);
  const findUserEmail = users.some((userName) => userName.email == email);

  if (findUser || findUserEmail) {
    return res.status(404).json({
      message:
        "Já existe um usuário com este userName ou e-mail. Tente novamente.",
    });
  }

  next();
};

const findUserRegister = (req, res, next) => {
  const { id } = req.params;
  const indexUser = users.findIndex((userItem) => userItem.id == id);

  if (indexUser == -1) {
    return res.status(404).json({ message: "user not found" });
  }

  req.indexUser = indexUser;

  next();
};

app.post("/user/register", userExists, (req, res) => {
  const { user, email, password } = req.body;
  const userObj = { id: uuidv4(), user, password, email };

  users.push(userObj);

  res.status(200).json({ message: "User created successfully" });
});

app.put("/user/update-user/:id", userExists, findUserRegister, (req, res) => {
  const { user, password, email } = req.body;
  const indexUser = req.indexUser;

  users[indexUser].email = email;
  users[indexUser].password = password;
  users[indexUser].user = user;

  res.status(200).json({ user: users[indexUser] });
});

app.delete("/users/delete/:id", findUserRegister, (req, res) => {
  const indexUser = req.indexUser;

  users.splice(indexUser, 1);

  res.status(200).json({ message: "user deleted" });
});

app.listen(4000);

// GET => Buscar informação no back-end - OK
// POST => Criar informação no back-end - OK
// PUT / PATCH => Alterar/Atualizar informação no back-end - OK
// DELETE => Deletar informação no back-end
