openssl genrsa -out ca-key.pem 2048
#generates a private key for signing the CA certificate

# Create the CA certificate
openssl req -x509 -new -nodes -key ca-key.pem -sha256 -days 1024 -out ca-cert.pem


openssl genrsa -out server-key.pem 2048
# generates a private key using openssl crypto shell library using rsa algorithm and key size of 2048


openssl req -new -key server-key.pem -out server-csr.pem
#creates a new CSR (certificate signing request) which is going to be signed by previously generated key


openssl x509 -req -in server-csr.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -days 500 -sha256

