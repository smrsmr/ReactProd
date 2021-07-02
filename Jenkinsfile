pipeline {
    agent {
        docker {
            image 'node:8'
            args '-p 3000:3000'
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
    }
}
