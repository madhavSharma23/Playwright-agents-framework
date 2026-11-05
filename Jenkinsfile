pipeline {
    agent any 
    
    tools {
        // Ensures the NodeJS plugin you installed earlier is used
        nodejs 'NodeJS 26' 
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                // Pulls the latest code from your configured Git repo
                checkout scm
            }
        }
        
        stage('Install Dependencies & Browsers') {
            steps {
                // Installs packages and creates the node_modules folder
                sh 'npm install'
                // Downloads Playwright browsers and required OS libraries
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                // Runs the script you added to your package.json
                sh 'npm run regression'
            }
        }
    }
    
    post {
        always {
            // Archives test results so they can be viewed directly in the Jenkins UI
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
    }
}