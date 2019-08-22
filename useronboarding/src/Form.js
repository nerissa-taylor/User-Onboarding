import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }

    }, [status]);

    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>)}

                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>)}

                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>)}

                <label className="checkbox-container">
                    Terms of Service
            <Field type="checkbox" name="termsofService" checked={values.termsofService} />
                </label>
                <button type="submit">Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>name:{user.name}</li>
                    <li>email:{user.email}</li>
                    <li>password:{user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsofservice }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsofservice: termsofservice || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("You funny"),
        email: Yup.string().required("email please"),
        password: Yup.string().required(),

    }),
    handleSubmit(values, { setStatus }) {
        axios.post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res);
                setStatus(res.data);
            });
    }

})(UserForm);
export default FormikUserForm;