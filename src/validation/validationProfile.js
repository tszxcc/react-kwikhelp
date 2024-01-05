import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    description: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().email().required('invalid email address'),
});

export { userSchema };