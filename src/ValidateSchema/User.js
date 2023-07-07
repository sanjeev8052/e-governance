import * as yup from 'yup'


export const signInSchema = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email.."),
    password: yup.string().min(6).required("Please Enter Your Password "),
})
export const signUpSchema = yup.object({
    name: yup.string().min(3).required("Please Enter Your Name "),
    email: yup.string().typeError().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email.."),
    phone: yup.number().min(1000000000,['Phone no is not valid']).max(9999999999,['Phone no is not valid']).required(),
    password: yup.string().min(6).required('Please Enter password'),
    confirm_password: yup.string().required().oneOf([yup.ref("password"), null], "password must match"),
})

export const ResetSchema = yup.object({
    password: yup.string().min(6).required('Please Enter password'),
    confirm_password: yup.string().required().oneOf([yup.ref("password"), null], "password must match"),

})



export const forgotSchema = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email.."),
})


export const ProfileSchema = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email.."),
    name: yup.string().min(3).required("Please Enter Your Email.."),
    phone: yup.number().min(1000000000,['Phone no is not valid']).max(9999999999,['Phone no is not valid']).required(),
})
export const ContactSchema = yup.object({
    fName: yup.string().min(3).required("Please Enter Your First Name.."),
    lName: yup.string().min(3).required("Please Enter Your Last Name.."),
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email.."),
    phone: yup.number().min(1000000000,['Phone no is not valid']).max(9999999999,['Phone no is not valid']).required(),
    message: yup.string().min(10).required(),
})
