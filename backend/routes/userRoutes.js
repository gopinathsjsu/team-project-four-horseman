const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  getUserByCreds,
} = require("../controller/userController");

router.post("/register", async (req, res) => {
  const userDetails = req.body;
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    address,
    city,
    zip,
    state,
    country,
    role,
  } = userDetails;
  try {
    let user = await getUserByCreds(email);
    if (user.statusCode === 200) {
      res.status(403).send({
        errors: {
          message: "Email address already registered.",
        },
      });
    } else {
      const createRes = await createUser(
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        address,
        city,
        zip,
        state,
        country,
        role
      );
      if (createRes.statusCode === 201) {
        res.status(201).send({
          user: {
            id: createRes.body.dataValues.id,
            firstName: createRes.body.dataValues.firstName,
            lastName: createRes.body.dataValues.lastName,
            role: createRes.body.dataValues.role,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: createRes.body,
          },
        });
      }
    }
  } catch (err) {
    console.log("Error encountered while registering user: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

router.post("/login", async (req, res) => {
  const userCreds = req.body;
  const { email } = userCreds;
  const { password } = userCreds;
  try {
    let userDetails = await getUserByCreds(email);
    if (userDetails.statusCode === 200) {
      userDetails = userDetails.body.dataValues;
      bcrypt.compare(password, userDetails.password, (err, isMatch) => {
        console.log(bcrypt.hashSync(password, 10));
        if (err) {
          res.status(500).send({
            errors: {
              message: err,
            },
          });
        } else if (!isMatch) {
          res.status(403).send({
            errors: {
              message: "Incorrect Password",
            },
          });
        } else {
          console.log("Successfully logged in");
          delete userDetails.password;
          res.status(200).send({
            user: {
              id: userDetails.id,
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              role: userDetails.role,
            },
          });
        }
      });
    } else {
      res.status(userDetails.statusCode).send({
        errors: {
          message: userDetails.body,
        },
      });
    }
  } catch (err) {
    console.log("Error encountered while user login: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

router.get("/profile/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  try {
    const userDetails = await getUser(user_id);
    if (userDetails.statusCode === 200) {
      res.status(200).send({
        user: {
          ...userDetails.body.dataValues,
        },
      });
    } else if (userDetails.statusCode === 404) {
      res.status(404).send({
        errors: {
          message: userDetails.body,
        },
      });
    } else {
      res.status(500).send({
        errors: {
          message: userDetails.body,
        },
      });
    }
  } catch (err) {
    console.log("Error encountered while getting user profile: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

router.put("/profile/:userId", async (req, res) => {
  const updateData = req.body;
  const user_id = req.params.userId;
  try {
    const updateRes = await updateUser(user_id, updateData);
    if (updateRes.statusCode === 200) {
      res.status(200).send("Profile updated successfully!");
    } else {
      console.log("Error encoutnered while updating profile: ", updateRes.body);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  } catch (err) {
    console.log("Error encountered while updating user: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

module.exports = router;
