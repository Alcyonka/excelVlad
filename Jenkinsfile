pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-p 3000:3000'
        }
    }

    environment {
        CI = 'true'
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
                echo 'Deploying....'
            }
        }
    }

}
