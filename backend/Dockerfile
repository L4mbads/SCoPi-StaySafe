# Use the official Go image as base
FROM golang:1.24.2

# Install wkhtmltopdf and its dependencies
RUN apt-get update && apt-get install -y \
    wget \
    xfonts-75dpi \
    xfonts-base \
    fontconfig \
    libjpeg62-turbo \
    libxrender1 \
    wkhtmltopdf \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy go mod files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of your app
COPY . .

# Build the app
RUN go build -o /scopi-backend ./cmd/api

# Expose port
EXPOSE 8080

# Run the app
CMD ["/scopi-backend"]
