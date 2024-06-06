pipeline {
    agent any
    parameters {
        string(name: 'SLEEP_TIME_IN_SECONDS', defaultValue: '10', description: 'The waiting time to Sonar server perform analysis')
        string(name: 'BUILD_MANUAL', defaultValue: 'Name-Service', description: 'Enter the Name Service')
    }
    stages {
        stage('Clone Repo') {
           steps {
             git 'https://github.com/adonis-developer/solid-study.git'
           }
        }
    }

    stage('Update File Env'){
        when{ 
            expression { params.BUILD_MANUAL == 'frontend'}
        } 
        steps {
            configFileProvider([
                configFile(fileId: "frontend-${ENV_CODE}-profile",
                targetLocation: "./.env")
            ]) {
                sh "cat ./.env"
            }
            echo "Update Env Done!!!!"
        }
    }
}