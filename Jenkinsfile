pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t my-react-app .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run my-react-app npm test'
            }
        }
        stage('Deploy') {
            steps {
                // Add deployment steps here
                echo 'deploying..'
            }
        }
    }
}
