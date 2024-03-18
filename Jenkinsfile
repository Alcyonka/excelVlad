pipeline {
    agent {
        node {
            label 'docker-agent-nodejs'
        }
    }

    stages {
        stage('check docker version') {
            steps {
                sh 'docker -v'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t excel-clone .'
                sh 'docker tag excel-clone:latest vladik25/excel-clone:latest'
            }
        }
        stage('Docker Login') {
            steps {
                sh 'docker login --username=vladik25 --password="V@s_C56ry9QR(rJ"'
                sh 'docker push vladik25/excel-clone:latest'
            }
        }
        stage('Deploy') {
            steps {
                // Add your deployment steps here
                sh 'echo "deploying.."'
            }
        }
    }
}
