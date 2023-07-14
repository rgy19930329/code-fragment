#!/bin/sh

# 登录服务器
ssh root@xx.xx.xx.xx

# 生成rsa秘钥
ssh-keygen

# 删除本地 known_hosts 中对应ip的相关加密信息
ssh-keygen -R xx.xx.xx.xx

# 拷贝内容到指定服务器
scp -r ./website/* root@xx.xx.xx.xx:/usr/local/nginx/html/biz-common/website
