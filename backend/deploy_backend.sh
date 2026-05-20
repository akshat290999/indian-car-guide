#!/bin/bash
set -e

echo "=========================================="
echo "🚀 AUTOMATING EC2 BACKEND DEPLOYMENT"
echo "=========================================="

KEY_NAME="unitailz-backend-key-$(date +%s)"
SG_NAME="unitailz-backend-sg-$(date +%s)"
REGION="ap-south-1"

echo "🔑 1/7 Creating SSH Key Pair..."
aws ec2 create-key-pair --key-name $KEY_NAME --query 'KeyMaterial' --output text > ${KEY_NAME}.pem
chmod 400 ${KEY_NAME}.pem

echo "🛡️ 2/7 Creating Security Group & Opening Port 8000..."
SG_ID=$(aws ec2 create-security-group --group-name $SG_NAME --description "Allow SSH and FastAPI" --query 'GroupId' --output text)

aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0 > /dev/null
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 8000 --cidr 0.0.0.0/0 > /dev/null

echo "🖥️ 3/7 Launching Ubuntu EC2 Server (t3.micro)..."
AMI_ID=$(aws ec2 describe-images \
    --owners 099720109477 \
    --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*" "Name=state,Values=available" \
    --query "sort_by(Images, &CreationDate)[-1].ImageId" \
    --output text)

INSTANCE_ID=$(aws ec2 run-instances \
    --image-id $AMI_ID \
    --instance-type t3.micro \
    --key-name $KEY_NAME \
    --security-group-ids $SG_ID \
    --query 'Instances[0].InstanceId' \
    --output text)

echo "⏳ 4/7 Waiting for server to boot up (this takes about 30 seconds)..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID
IP_ADDRESS=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

echo "✅ Server is running at IP: $IP_ADDRESS"
echo "⏳ Giving the server's SSH service 45 seconds to fully wake up..."
sleep 45

echo "☁️ 5/7 Uploading your backend code..."
ssh -i ${KEY_NAME}.pem -o StrictHostKeyChecking=no ubuntu@$IP_ADDRESS "mkdir -p ~/app"
scp -i ${KEY_NAME}.pem -o StrictHostKeyChecking=no *.py ubuntu@$IP_ADDRESS:~/app/
if [ -f requirements.txt ]; then
    scp -i ${KEY_NAME}.pem -o StrictHostKeyChecking=no requirements.txt ubuntu@$IP_ADDRESS:~/app/
fi
if [ -d database ]; then
    scp -i ${KEY_NAME}.pem -o StrictHostKeyChecking=no -r database ubuntu@$IP_ADDRESS:~/app/
fi

echo "⚙️ 6/7 Installing Python, FastAPI, and starting the server 24/7..."
ssh -i ${KEY_NAME}.pem -o StrictHostKeyChecking=no ubuntu@$IP_ADDRESS << 'EOF'
    # Block all interactive prompts and force automatic service restarts
    export DEBIAN_FRONTEND=noninteractive
    export NEEDRESTART_MODE=a
    
    sudo apt-get update -y
    sudo apt-get install -y python3-pip python3-venv tmux
    
    cd ~/app
    python3 -m venv venv
    source venv/bin/activate
    
    if [ -f requirements.txt ]; then
        pip install -r requirements.txt
    else
        pip install fastapi uvicorn pydantic fastapi-cors
    fi
    
    tmux new-session -d -s fastapi_server 'uvicorn main:app --host 0.0.0.0 --port 8000'
EOF

echo "=========================================="
echo "🎉 BACKEND DEPLOYED SUCCESSFULLY!"
echo "=========================================="
echo "Your API is now live at: http://${IP_ADDRESS}:8000"
echo "The digital key to access this server was saved on your Mac as: ${KEY_NAME}.pem"
echo "=========================================="