pipeline {
    agent any 
    
    tools {
        // This must match the exact name from Manage Jenkins > Tools
        nodejs 'NodeJS26' 
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies & Browsers') {
            steps {
                // npm ci is faster and stricter than npm install for CI environments
                sh 'npm ci'
                // Installs Chromium, Firefox, WebKit and required OS-level libraries
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            // Publishes the JUnit XML for the Jenkins test trend graph
            junit 'playwright-report/results.xml' 
            
            // Archives the HTML report and traces so you can view them in Jenkins
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
    }
}