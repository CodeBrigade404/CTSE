pipeline {
    agent any
    tools {
        nodejs 'node' // Use the NodeJS installation name defined in Jenkins
    }
   
    stages { 

          stage('Git Checkout') {
            steps {
               git branch: 'main', credentialsId: 'git-cred', url: 'https://github.com/CodeBrigade404/CTSE.git'
            }
        }
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
withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'EKS-2', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', serverUrl: 'https://194A46D1CA4098AC4F36AE7BA222AC35.gr7.ap-southeast-1.eks.amazonaws.com']]) {   
    sh "kubectl apply -f deployment-service.yml"                 
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'EKS-2', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', serverUrl: 'https://194A46D1CA4098AC4F36AE7BA222AC35.gr7.ap-southeast-1.eks.amazonaws.com']]) {   
                    sh "kubectl get svc -n webapps"
                }
            }
        }
    }
}
