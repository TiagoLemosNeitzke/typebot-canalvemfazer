import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {SelectField} from "../../FormFields";

const billingTypeOptions = [
    {value: "BOLETO", label: "Boleto"},
    {value: "PIX", label: "PIX"},
];

export default function PaymentOptions(props) {
    const {
        formField: {
            billingType
        },
        setFieldValue
    } = props;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                Selecione a forma de pagamento
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                <Grid  item xs={6} sm={6} style={{ textAlign: "center" }}>
                        <SelectField
                            name={billingType.name}
                            label={billingType.label}
                            data={billingTypeOptions}
                            fullWidth
                            value={billingType}
                            onChange={(e) => {
                                setFieldValue("billingType", e.target.value)
                            }
                            }
                        >
                        </SelectField>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}