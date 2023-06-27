import * as yup from "yup";

const passwordErrorText = (
  <ul>
    Password must be: <li>Minimum 6 characters and maximum 30 characters</li>
    <li>Have one uppercase letter</li>
    <li>Have one lowercase letter</li>
    <li>Have one special character</li>
  </ul>
);

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,30}$/,
      {message: passwordErrorText}
    
    )
    .required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});



export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("required"),
  password: yup
    .string()
    .required("required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,30}$/,
     {message: passwordErrorText }
    ),
});
