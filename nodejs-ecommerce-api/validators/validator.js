import { check } from "express-validator";
export const userRegisterValidator = [
  check("fullname").not().isEmpty().withMessage("Name is required."),
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must at least 6 character long."),
];

export const userLoginValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must at least 6 character long."),
];
