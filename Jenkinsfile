pipeline {
    agent any 
    
    environment {
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
        
        stage('Playwright Healer (Copilot)') {
            when {
                expression { currentBuild.result == 'UNSTABLE' }
            }
            steps {
                sh 'gh extension install github/gh-copilot --force'
                sh 'gh copilot suggest "Analyze the failing Playwright tests and fix the broken selectors or assertions in the code."'
                
                // Re-run the tests to verify the AI's fixes actually work
                sh 'npm run regression'
                
                // --- NEW: Commit and push the fixes to a new branch ---
                
                // 1. Configure the Git user for the commit
                sh 'git config user.email "jenkins-healer@automation.com"'
                sh 'git config user.name "Jenkins AI Healer"'
                
                // 2. Create and checkout a unique branch using the Jenkins build number
                sh "git checkout -b healer-patch-build-${env.BUILD_NUMBER}"
                
                // 3. Stage and commit the modified test files
                sh 'git add .'
                sh 'git commit -m "fix: AI Healer automatically repaired failing tests"'
                
                // 4. Push the new branch to GitHub using the injected GH_TOKEN for authentication
                sh 'git push https://${GH_TOKEN}@github.com/madhavSharma23/Playwright-agents-framework.git HEAD:refs/heads/healer-patch-build-${env.BUILD_NUMBER}'
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