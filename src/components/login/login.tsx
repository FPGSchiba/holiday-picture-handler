import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import BackgroundImage from '../pictures/login/Background.png';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { doLogin } from "../../store/actions/user";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .max(45, 'Der Benutzername ist zu lange!')
            .required('Dieses Feld wird benötigt!'),
        password: Yup.string()
            .max(50, 'Das Passwort ist zu lange!')
            .required('Dieses Feld wird benötigt!'),
        });
    
    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmit = () => {
        setLoading(true);
        dispatch(doLogin(formik.values.username, formik.values.password, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                navigate('/home');
            }
        }))
        setLoading(false);
    }

    const onPasswordReset = () => {
        setLoading(true);
        console.log('password reset');
    }

    const formik = useFormik({validationSchema, initialValues, onSubmit});

    return(
        <div className="login login-image" style={{backgroundImage: `url(${BackgroundImage})`}}>
            <div className="login login-container">
                <Typography variant='h4' component='h2' className="login login-title" >Anmeldung</Typography>
                <form className="login login-form" onSubmit={formik.handleSubmit}>
                    <div className="login login-component login-component__username">
                        <TextField
                            className="login login-text-field"
                            label="Benutzername"
                            variant="outlined"
                            value={formik.values.username}
                            name="username"
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </div>
                    <div className="login login-component login-component__password">
                        <TextField
                            className="login login-text-field"
                            label="Passwort"
                            type="password"
                            variant="outlined"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <Button
                        className="login login-button login-button-submit"
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        onKeyPress={onSubmit}
                    >Anmelden</Button>
                    <Button
                        className="login login-button login-button-password"
                        variant="contained"
                        onClick={onPasswordReset}
                        disabled={loading}
                        onKeyPress={onSubmit}
                    >Passwort vergessen?</Button>
                    { loading ?
                        <div className="login login-progress">
                            <CircularProgress />
                        </div> : null
                    }
                </form>
            </div>
        </div>
    )
}