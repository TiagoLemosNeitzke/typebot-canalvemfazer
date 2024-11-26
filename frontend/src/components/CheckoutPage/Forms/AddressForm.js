import React, {useContext, useEffect, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {InputField/*, SelectField*/} from "../../FormFields";
import {AuthContext} from "../../../context/Auth/AuthContext";

/*const countries = [
    {
        value: "BR",
        label: "Brasil",
    },
];*/

export default function AddressForm(props) {

    // const {user} = useContext(AuthContext);
    // const [billingName, setBillingName] = useState(user.name);
    // const [phoneNumber, setPhoneNumber] = useState(user.company.phone);
    // const [cnpjNumber, setCnpjNumber] = useState("");
    // const [addressZipCode, setAddressZipCode] = useState("");
    // const [addressStreet, setAddressStreet] = useState(user.company.addressStreet);
    // const [addressState, setAddressState] = useState(user.company.addressState);
    // const [addressCity, setAddressCity] = useState(user.company.addressCity);
    // const [addressDistrict, setAddressDistrict] = useState(user.company.addressDistrict);
    const {
        formField: {
            // firstName,
            // phone,
            cnpj,
            // address1,
            // city,
            // state,
            zipcode,
            // country,
        },
        setFieldValue
    } = props;
    // useEffect(() => {
        // setFieldValue("firstName", billingName)
        // setFieldValue('phone', phoneNumber)
        // setFieldValue('cnpj', cnpjNumber)
        // setFieldValue("zipcode", addressZipCode)
        // setFieldValue("address2", addressStreet)
        // setFieldValue("state", addressState)
        // setFieldValue("city", addressCity)
        // setFieldValue("country", addressDistrict)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const formatCnpj = (value) => {
        return value
            .replace(/\D/g, "") // Remove tudo que não for número
            .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona ponto após os dois primeiros dígitos
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona ponto após os cinco primeiros dígitos
            .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona barra após os oito primeiros dígitos
            .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona hífen após os doze primeiros dígitos
            .slice(0, 18); // Limita a entrada ao formato XX.XXX.XXX/XXXX-XX
    };

    const formatCep = (value) => {
        return value
            .replace(/\D/g, "") // Remove tudo que não for número
            .replace(/^(\d{5})(\d)/, "$1-$2") // Adiciona hífen após os cinco primeiros dígitos
            .slice(0, 9); // Limita a entrada ao formato XXXXX-XXX
    };

    const handleCnpjNumberChange = (e) => {
        const formattedValue = formatCnpj(e.target.value);
        setFieldValue("cnpj", formattedValue);
    };

    // Atualizar valor do CEP no formulário
    const handleZipCodeChange = (e) => {
        const formattedValue = formatCep(e.target.value);
        setFieldValue("zipcode", formattedValue);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Vamos precisar de algumas informações
            </Typography>
            <Grid container spacing={3}>

               {/* <Grid item xs={6} sm={6}>
                    <InputField name={firstName.name} label={firstName.label} fullWidth
                                value={billingName}
                                onChange={(e) => {
                                    setBillingName(e.target.value)
                                    setFieldValue("firstName", e.target.value)
                                }}
                    />
                </Grid>*/}
                {/*<Grid item xs={6} sm={6}>
                    <InputField name={phone.name} label={phone.label} fullWidth
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                    setFieldValue("phone", e.target.value)
                                }}
                    />
                </Grid>*/}
                <Grid item xs={6} sm={6}>
                    <InputField name={cnpj.name}
                                label={cnpj.label}
                                fullWidth
                                onChange={handleCnpjNumberChange}
                    />
                </Grid>

                <Grid item xs={4}>
                    <InputField
                        name={zipcode.name}
                        label={zipcode.label}
                        fullWidth
                        onChange={handleZipCodeChange}
                    />
                </Grid>
                {/*<Grid item xs={6} sm={6}>
                    <SelectField
                        name={country.name}
                        label={country.label}
                        data={countries}
                        fullWidth
                        value={addressDistrict}
                        onChange={(e) => {
                            setAddressDistrict(e.target.value)
                            setFieldValue("country", e.target.value)
                        }
                        }
                    />
                </Grid>*/}

                {/*<Grid item xs={8}>
                    <InputField
                        name={address1.name}
                        label={address1.label}
                        fullWidth
                        value={addressStreet}
                        onChange={(e) => {
                            setAddressStreet(e.target.value)
                            setFieldValue("address2", e.target.value)

                        }}
                    />
                </Grid>

                <Grid item xs={4}>
                    <InputField
                        name={state.name}
                        label={state.label}
                        fullWidth
                        value={addressState}
                        onChange={(e) => {
                            setAddressState(e.target.value)
                            setFieldValue("state", e.target.value)

                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <InputField
                        name={city.name}
                        label={city.label}
                        fullWidth
                        value={addressCity}
                        onChange={(e) => {
                            setAddressCity(e.target.value)
                            setFieldValue("city", e.target.value)
                        }}
                    />
                </Grid>*/}

            </Grid>
        </React.Fragment>
    );
}
