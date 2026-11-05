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
                sh '/opt/homebrew/bin/gh extension install github/gh-copilot --force'
                
                // Pipe the Playwright agent instructions and error context to Copilot
                sh '''
                cat .github/agents/playwright-test-healer.agent.md test-results/**/error-context.md | \
                /opt/homebrew/bin/gh copilot suggest "Act as the Playwright Healer Agent using the provided instructions. Analyze the error context and provide the shell commands (sed, awk, etc.) or node script to patch the broken selectors in the source code."
                '''
                
                // Re-run the tests to verify the AI's fixes actually work
                sh 'npm run regression'
                
                // Commit and push the fixes to a new branch
                sh 'git config user.email "jenkins-healer@automation.com"'
                sh 'git config user.name "Jenkins AI Healer"'
                sh "git checkout -b healer-patch-build-${env.BUILD_NUMBER}"
                sh 'git add .'
                sh 'git commit -m "fix: AI Healer automatically repaired failing tests"'
                
                // Push using the injected token
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