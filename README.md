## Instructions for running this application

This project is configured to use https instead of http and for that you should do the following to enable smooth communication between client and server:

    1. Run the generate_sertificates.sh script to generate necesary certificates to enable https communication.
    2. In order for firefox or any other browser to trust your application you should import previous created and self signed ca-cert.pem to trusted  firefox certificates

    **NOTE: Since Angular does not support https out of the box, a proxy is beeing used to redirect http requests to https requests: **
        {
        "": {
            "target": "https://127.0.0.1:4000",
            "secure": false,
            "changeOrigin": true
        }
    }

To run angular application use this command:

    ng serve --ssl --ssl-key ../certificates/server-key.pem --ssl-cert ../certificates/server-cert.pem -o

As for backend configuration, due to existance of JWT in the project, you should replace sample code with your secret code in src/utilities/jwt.ts:

    const secretKey = 'Sample_secret_key'; 

With all of that setup, you should be able to go and test out the web application.


