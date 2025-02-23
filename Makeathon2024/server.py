import socket
import json

host = '0.0.0.0'  # Listen on all available network interfaces
port = 5000       # The port number should match the ESP32's serverPort

# Create a socket object (IPv4, TCP)
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the host and port
server_socket.bind((host, port))

# Enable the server to accept incoming connections (max backlog of 5 connections)
server_socket.listen(5)
print(f"Server listening on {host}:{port}...")

while True:
    # Accept a connection from the ESP32
    client_socket, client_address = server_socket.accept()
    print(f"Connection established with {client_address}")

    # Receive data from the client
    while True:
        data = client_socket.recv(1024)  # Receive data in chunks of 1024 bytes
        try:
            data= data.encode('utf-8')
        except AttributeError:
            pass
        if not data:
            break  # If no data is received, close the connection
        print(data)
        print("******************")
        
        with open("data.json", "r") as file:

            contents = json.loads(file.read())
        with open("data.json", "w") as file:
            contents["data"].append(data)
            file.write(json.dumps(contents))
    
    
    # Close the connection
    client_socket.close()
    print(f"Connection with {client_address} closed.")

