pipeline {
    agent any 
    
    environment {
        // This token will automatically be available inside your script.sh
        GH_TOKEN = credentials('GITHUB_COPILOT_TOKEN') 
    }
    
    tools {
        nodejs 'NodeJS 26' 
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies & Browsers') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm run regression'
                }
            }
        }
        
        stage('Playwright Healer') {
            when {
                expression { currentBuild.result == 'UNSTABLE' }
            }
            steps {
                // Grant execution permissions and run your consolidated script
                sh 'chmod +x script.sh'
                sh './auto-heal.sh'
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
    }
}