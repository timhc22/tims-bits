Simlink the app you want to use as 'app' because the server will
use this post-receive hook:

git --work-tree=/home/mylinuxusername/tims-bits 
--git-dir=/home/mylinuxusername/tims-bits.git checkout -f develop
cd /home/mylinuxusername/tims-bits/app

npm install

pm2 restart all