import React, {useState, useEffect} from "react";
import qs from 'query-string'
import * as Yup from "yup";
import {useHistory} from "react-router-dom";
import {Link as RouterLink} from "react-router-dom";
import {toast} from "react-toastify";
import {Formik, Form, Field} from "formik";
import usePlans from "../../hooks/usePlans";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.svg";
import {i18n} from "../../translate/i18n";

import {openApi} from "../../services/api";
import toastError from "../../errors/toastError";
import moment from "moment";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                Chattnes
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        overflowX: "hidden",
        width: "100vw",
        background: "#D7F5DC", //cor de fundo
        //backgroundImage: "url(https://#)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    paper: {
        backgroundColor: theme.palette.login, //DARK MODE PLW DESIGN//
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "55px 30px",
        margin: "10px 0",
        borderRadius: "12.5px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const UserSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Nome da empresa muito curto.")
        .max(50, "Nome da empresa muito longo.")
        .required("Campo Obrigatório."),
    password: Yup.string().min(5, "Senha muito curta.").max(50, "Senha muito longa."),
    email: Yup.string().email("E-mail inválido.").required("Campo Obrigatório."),
    cnpj: Yup.string().required("Campo Obrigatório."),
    zipcode: Yup.string().min(8, "CEP Inválido.").max(9, "CEP Inválido.").required("Campo Obrigatório."),
    phone: Yup.string().required("Campo Obrigatório."),
});

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    let companyId = null

    const params = qs.parse(window.location.search)
    if (params.companyId !== undefined) {
        companyId = params.companyId
    }

    const initialState = {name: "", email: "", phone: "", password: "", planId: "", cnpj: "", zipcode: ""};

    const [user] = useState(initialState);
    const dueDate = moment().add(10, "day").format(); // Aqui dá o prazo de teste grátis
    const handleSignUp = async values => {
        Object.assign(values, {recurrence: "MENSAL"});
        Object.assign(values, {dueDate: dueDate});
        Object.assign(values, {status: "t"});
        Object.assign(values, {campaignsEnabled: true});
        try {
            await openApi.post("/companies/cadastro", values);
            toast.success(i18n.t("signup.toasts.success"));
            history.push("/login");
        } catch (err) {
            // console.log(err);
            toastError(err);
        }
    };

    const [plans, setPlans] = useState([]);
    const {list: listPlans} = usePlans();

    useEffect(() => {
        async function fetchData() {
            const list = await listPlans();
            setPlans(list);
        }

        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <div>
                        <center><img style={{margin: "0 auto", width: "70%"}} src={logo} alt="Logocadastro"/></center>
                    </div>
                    {/*<Typography component="h1" variant="h5">
					{i18n.t("signup.title")}
				</Typography>*/}
                    {/* <form className={classes.form} noValidate onSubmit={handleSignUp}> */}
                    <Formik
                        initialValues={user}
                        enableReinitialize={true}
                        validationSchema={UserSchema}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                handleSignUp(values);
                                actions.setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({touched, errors, isSubmitting}) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            autoComplete="name"
                                            name="name"
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            variant="outlined"
                                            fullWidth
                                            id="name"
                                            label="Nome da Empresa"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/*todo preciso formatar os campos*/}
                                        <Field
                                            as={TextField}
                                            autoComplete="CNPJ"
                                            name="cnpj"
                                            error={touched.cnpj && Boolean(errors.cnpj)}
                                            helperText={touched.cnpj && errors.cnpj}
                                            variant="outlined"
                                            fullWidth
                                            id="cnpj"
                                            label="CNPJ"
                                            required
                                        >
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            autoComplete="zipcode"
                                            name="zipcode"
                                            error={touched.zipcode && Boolean(errors.zipcode)}
                                            helperText={touched.zipcode && errors.zipcode}
                                            variant="outlined"
                                            fullWidth
                                            id="zipcode"
                                            label="CEP"
                                            required
                                        >
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            label={i18n.t("signup.form.email")}
                                            name="email"
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            autoComplete="email"
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            fullWidth
                                            id="phone"
                                            label="Telefone com (DDD)"
                                            placeholder="teste"
                                            name="phone"
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                            autoComplete="phone"
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            fullWidth
                                            name="password"
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            label={i18n.t("signup.form.password")}
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="plan-selection">Plano</InputLabel>
                                        <Field
                                            as={Select}
                                            variant="outlined"
                                            fullWidth
                                            id="plan-selection"
                                            label="Plano"
                                            name="planId"
                                            required
                                        >
                                            {plans.map((plan, key) => (
                                                <MenuItem key={key} value={plan.id}>
                                                    {plan.name} - Atendentes: {plan.users} -
                                                    WhatsApp: {plan.connections} -
                                                    Filas: {plan.queues} - R$ {plan.value}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    {i18n.t("signup.buttons.submit")}
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link
                                            href="#"
                                            variant="body2"
                                            component={RouterLink}
                                            to="/login"
                                        >
                                            {i18n.t("signup.buttons.login")}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Box mt={4}><Copyright/></Box>
            </Container>
        </div>
    );
};

export default SignUp;