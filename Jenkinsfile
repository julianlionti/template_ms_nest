pipeline {
  agent any
  environment {
        userName = 'racinglocura07'
        registryCredential = credentials('dockertoken')
        DOCKERHUB_CREDENTIALS=credentials('dockerhub')
  }

  stages {
    stage('Tooling versions') {
      steps {
        sh '''
          docker --version
          docker-compose --version
        '''
      }
    }

    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }

    stage('Build') {
      steps {
        sh "docker-compose build"
        sh "docker-compose push"
      }
    }

    stage('Run') {
      steps {
        sh "docker-compose up -d"
      }
    }

    stage ("Logout") {
      steps {
        sh "docker logout"
      }
    }
  }
}
