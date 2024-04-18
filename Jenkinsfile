pipeline {
    agent any
    tools {
        nodejs 'node' // Use the NodeJS installation name defined in Jenkins
    }
   
    stages { 
        stage('Node JS Build') { 
            steps {
                sh 'npm install'
            }
        }
 
        stage('Build & Tag Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {
                        sh "docker build -t lachisenarath576259/authen ."
                    }
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {
                        sh "docker push lachisenarath576259/authen "
                    }
                }
            }
        }

        stage('Deploy To Kubernetes') {
            steps {
                withKubeConfig(credentialsId: 'k8-token', serverUrl: 'https://800F84F142BBCD88A8B3616C37B6CB94.gr7.ap-southeast-1.eks.amazonaws.com', namespace: 'webapps') {
                    sh "kubectl apply -f deployment-service.yml"
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                withKubeConfig(credentialsId: 'k8-token', serverUrl: 'https://800F84F142BBCD88A8B3616C37B6CB94.gr7.ap-southeast-1.eks.amazonaws.com', namespace: 'webapps') {
                    sh "kubectl get svc -n webapps"
                }
            }
        }
    }
}
