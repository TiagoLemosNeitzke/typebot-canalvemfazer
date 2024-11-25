import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { InputField } from "../../FormFields";

export default function CreditCardForm(props) {
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");

    const {
        formField: {
            cardHolderNameField,
            cardNumberField,
            expirationDateField,
            cvvField,
        },
        setFieldValue
    } = props;

    useEffect(() => {
        setFieldValue("cardHolderName", cardHolderName);
        setFieldValue("cardNumber", cardNumber.replace(/\s/g, "")); // Remove os espaços ao salvar
        setFieldValue("expirationDate", expirationDate);
        setFieldValue("cvv", cvv);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardHolderName, cardNumber, expirationDate, cvv]);

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, "") // Remove tudo que não for número
            .slice(0, 16)
            .replace(/(\d{4})/g, "$1 ") // Adiciona um espaço a cada 4 dígitos
            .trim(); // Remove espaços extras no final
    };

    const formatValidation = (value) => {
        return value
            .replace(/\D/g, "") // Remove tudo que não for número
            .replace(/(\d{2})(\d{1,2})?/, (match, p1, p2) =>
                p2 ? `${p1}/${p2}` : p1 // Adiciona a barra após os dois primeiros dígitos
            )
            .slice(0, 5); // Limita a entrada ao formato MM/YY
    };

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardNumber(formattedValue);
        setFieldValue("cardNumber", formattedValue.replace(/\s/g, "")); // Atualiza o valor sem espaços
    };

    const handleExpirationDateChange = (e) => {
        const formattedValue = formatValidation(e.target.value);
        setExpirationDate(formattedValue);
        setFieldValue("expirationDate", formattedValue.replace(/\s/g, "")); // Atualiza o valor sem espaços
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Informações do Cartão de Crédito
            </Typography>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                    <InputField
                        name={cardHolderNameField.name}
                        label={cardHolderNameField.label}
                        fullWidth
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        name={cardNumberField.name}
                        label={cardNumberField.label}
                        fullWidth
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                    />
                </Grid>

                <Grid item xs={6} sm={6}>
                    <InputField
                        name={expirationDateField.name}
                        label={expirationDateField.label}
                        fullWidth
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                    />
                </Grid>

                <Grid item xs={6} sm={6}>
                    <InputField
                        name={cvvField.name}
                        label={cvvField.label}
                        fullWidth
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
