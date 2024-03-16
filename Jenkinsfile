pipeline {
    agent {
        node {
            label 'docker-agent-nodejs'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
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
