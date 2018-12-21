const db = require("./db");
const { hash } = require("../utils/hash");
const { throw400, checkDuplicates } = require("../utils/errors");

const collectionName = "users";

async function search() {
  return db
    .collection(collectionName)
    .find()
    .sort({ name: 1 })
    .project({ email: 1, name: 1 })
    .toArray();
}

async function all() {
  return db
    .collection(collectionName)
    .find()
    .project({ email: 1, name: 1 })
    .toArray();
}

async function login({ email, password }) {
  const user = await db.collection(collectionName).findOne({ email });

  if (!user) {
    throw400({
      msg: "No matching email found"
    });
  }
  if (!compare(password, user.password)) {
    throw400({
      msg: "Incorrect password"
    });
  }

  // do not include the password in the response
  user.password = undefined;
  return user;
}

async function register({ email, password, name, role }) {
  // hash the user password before storing it
  const hashedPassword = hash(password);

  const user = { email, name, password: hashedPassword, role };
  await db
    .collection(collectionName)
    .insertOne(user)
    .catch(err =>
      checkDuplicates(err, {
        email: "This email is already taken"
      })
    );

  // do not include the password in the response
  user.password = undefined;
  return user;
}

async function update({ id, data }) {
  await db
    .collection(collectionName)
    .updateOne({ id: id }, { $set: data })
    .catch(err =>
      checkDuplicates(err, {
        email: "This email is already taken"
      })
    );
  return data;
}

async function deleteById({ id }) {
  await db.collection(collectionName).remove({ id: id });
  return "Success!";
}

module.exports = {
  get raw() {
    return db.collection(collectionName);
  },
  all,
  search,
  login,
  register,
  update,
  deleteById
};
