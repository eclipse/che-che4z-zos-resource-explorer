#!groovy

def kubernetes_config = """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:12.10.0-alpine
    tty: true
  - name: jnlp
    volumeMounts:
    - name: volume-known-hosts
      mountPath: /home/jenkins/.ssh
  volumes:
  - name: volume-known-hosts
    configMap:
      name: known-hosts
"""

pipeline {
    agent {
        kubernetes {
            label 'explorer-for-zos-pod'  
            yaml kubernetes_config
        }
    }    
    options {
        skipDefaultCheckout(false) 
        // skipDefaultCheckout(true) 
    }
    environment {
       branchName = "${env.BRANCH_NAME}"
       npm_config_cache = "${env.WORKSPACE}"
    }
    stages {
        stage('Compile & Test & Package') {
            environment {
                // npm_config_cache = "${env.WORKSPACE}"
            }
            steps {
                container('node') {
                    sh "pwd"
                    // sh "wget https://ms-vscode.gallery.vsassets.io/_apis/public/gallery/publisher/ms-vscode/extension/csharp/1.3.0/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage"
                    sh "ls -a"
                    sh "npm ci"
                    // sh "npm test"
                    // sh "npm run webpack-production"
                    // sh "npm i vsce -prefix $HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools"
                    // sh "$HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools/node_modules/vsce/out/vsce package"
                }
            }
        }
        stage('Packaging') {
            environment {
                // npm_config_cache = "${env.WORKSPACE}"
            }
            steps {
                container('node') {
                    sh "pwd"
                    sh "ls -a"
                    sh "npm run webpack-production"
                    // sh "chown -R 1001140000:0 /.npm"
                    sh "npm i vsce -prefix $HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools"
                    sh "$HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools/node_modules/vsce/out/vsce package"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (branchName == 'master' || branchName == 'development') {
                        echo 'deployment skipped'
                    } else {
                        container('jnlp') {
                            sshagent ( ['projects-storage.eclipse.org-bot-ssh']) {
                                // sh '''
                                // ssh genie.che4z@projects-storage.eclipse.org rm -rf /home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                // ssh genie.che4z@projects-storage.eclipse.org mkdir -p /home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                // scp -r /home/jenkins/agent/workspace/e4z-explorer-for-zos_cicd-deploy/*zosexplorer*.vsix genie.che4z@projects-storage.eclipse.org:/home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                // '''
                            }
                        }
                    }
                }
            }
        }
    }
}
