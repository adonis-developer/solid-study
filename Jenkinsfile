def getEnvCode(def _git_branch){
    if (_git_branch == "[*/master]"){
        env_code = "prod"
    }
    else{
        env_code = "feature"
    }
    return env_code
}

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

        stage('Update File Env'){
            when{ 
                expression { params.BUILD_MANUAL == 'frontend'}
            } 
            steps {
                script {
                    env.ENV_CODE = getEnvCode(env.BRANCH_NAME)
                    echo "${ENV_CODE}"
                    echo "${scm.branches}"
                     currentVersion = sh(returnStdout: true, script: "git tag -l | tail -1").trim()
                    echo "${currentVersion}"
                }

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

    
}