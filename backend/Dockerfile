# Use the official Go image as a base
FROM golang:1.24.2

# Set the working directory
WORKDIR /app

# Copy the go.mod and go.sum files
COPY go.mod go.sum ./

# Download the Go modules
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the application
RUN go build -o /scopi-backend ./cmd/api

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["/scopi-backend"]
