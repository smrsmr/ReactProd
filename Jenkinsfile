pipeline {
    agent { docker 'node' }
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
stage('Docker build') {
    echo '尝试连接'
    docker.withServer('server ip', 'certificate id') {
        echo '连接成功'
        docker.build("jenkinsdocker/test-image:" + new Date().getTime(), "-f ./Dockerfile .")
    }
}
