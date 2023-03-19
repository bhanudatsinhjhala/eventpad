import React from 'react';
import base64url from "base64url";
import { yellowColorTheme } from "../colorTheme.js";
import Header from "./Header.jsx";
import { ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, Container } from "@mui/material";
import { registerAuthCred } from "../api.js";
export default function Test() {

    function registerCred() {
        registerAuthCred().then(async (res) => {
            // res = res.json();
            console.info(res.data.publicKey);
            let data = res.data.publicKey[0];
            let publicKey = performAtMakeCredReq(data);
            console.log("publicKey -----", publicKey);
            let credentials = await navigator.credentials.create({ publicKey });
            console.log(
                "credentials ------------- ",
                credentials);
        })
    }
    let performAtMakeCredReq = (makeCredReq) => {
        console.log(base64url.toBuffer(makeCredReq.challenge));
        console.log(base64url.toBuffer(makeCredReq.user.id));
        makeCredReq.challenge = base64url.toBuffer(makeCredReq.challenge);
        makeCredReq.user.id = base64url.toBuffer(makeCredReq.user.id);
        return makeCredReq;
    };

    // fix padding according to the new format

    return (
        <div>
            <Header />
            <ThemeProvider theme={yellowColorTheme}>
                <CssBaseline />
                <Container sx={{ margin: "auto", marginTop: "100px" }}>
                    <Button variant="outlined" color="primary" size="small" onClick={registerCred}>
                        Register
                    </Button>
                </Container>
            </ThemeProvider>
        </div>
    )
}