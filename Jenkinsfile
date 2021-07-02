pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'yarn'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }   
    }
}
