import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    email: Yup.string().email().required('invalid email address'),
});

export { userSchema };