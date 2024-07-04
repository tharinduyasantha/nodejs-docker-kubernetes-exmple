# Use the official RabbitMQ image from the Docker Hub
FROM rabbitmq:3-management

# Expose necessary ports
EXPOSE 5672 15672

# Environment variables for default user credentials
ENV RABBITMQ_DEFAULT_USER=guest
ENV RABBITMQ_DEFAULT_PASS=guest

# Command to start RabbitMQ
CMD ["rabbitmq-server"]
