pipeline {
    agent {
        node {
            label 'docker-agent-nodejs'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'node -v'
            }
        }
        stage('Test') {
            steps {
                sh 'npm -v'
            }
        }
        stage('Deploy') {
            steps {
                // Add deployment steps here
                sh 'echo "deploying.."'
            }
        }
    }
}
