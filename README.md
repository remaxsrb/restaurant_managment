## Instructions for running this application

Clone this repostiory:

    git clone git@github.com:remaxsrb/restaurant_managment.git

Install all dependencies on both frontend and backend with:

    npm install

This project is configured to use https instead of http and for that you should do the following to enable smooth communication between client and server:

    1. Run  generate_sertificates.sh script to generate necesary certificates to enable https communication.

        cd certificates/
        chmod +x generate_sertificates.sh
        ./generate_sertificates.sh

    2. In order for firefox or any other browser to trust your application you should import previous created and self signed ca-cert.pem to trusted  firefox certificates

To run angular application use this command:

    ng serve --ssl --ssl-key ../certificates/server-key.pem --ssl-cert ../certificates/server-cert.pem -o

As for backend configuration, due to existance of JWT in the project, you should replace sample code with your secret code in src/utilities/jwt.ts:

    const secretKey = 'Sample_secret_key'; 
Also, in login.ts and admin-login.ts you should do the same:

    private readonly TOKEN_KEY = 'sample_secret_key';

With all of that setup, you should be able to go and test out the web application.


