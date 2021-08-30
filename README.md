### 自己封装的组件库
### git 目录结构

hooks : 目录包含客户端或服务端的钩子脚本
info : 包含一个全局性的排除文件
objects ：目录存储的所有数据内容
refs ：目录存储指向数据（分支）的提交对象的指针
config ：包含项目特有的配置选项
description : 用来显示对仓库的描述信息
HEAD ：文件只是目前被检出的分支
index ：文件保存暂存区信息

### 区域

#### 工作区

#### 暂存区

#### 版本库

### 对象

#### GIT 对象

        为一个文件版本
        key: value 组成的键值对（key是value对应的hash）
             键值对在GIT内部为一个blob类型

#### 树对象 为一个项目版本 一个项目版本包含多个文件版本

        GIT根据某一时刻暂存区 所表示的状态创建并记录一个对应的树对象，如此重复便可依次记录一系列的树对象
        树对象是对暂存区内操作的抽象，这颗树对象相当于快照，当我们的工作区有任何的更改
        同步到暂存区时，便会调用write-tree 命令
        通过write-tree向暂存区内容写入一个树对象，它会根据当前暂存区的状态自动创建一个
        新的树对象，及每一次同步都产生一个树对象，且该命令会返回一个hash值指向该对象



#### 提交对象

        对树对象做一层包裹  包含提交信息
        版本回退  或者 时间穿梭 只需要获得该版本的提交对象的hash 值

### 基础 linux 命令

clear：清屏
echo：想控制台输出信息； echo '新创建文件' > 1.txt
ll：显示当前目录下的所有文件
find 目录名：平铺子孙目录的文件和目录
find 目录 -type f: 平铺所有文件
rm file.txt : 删除文件
mv 源文件 重命名文件名：文件重命名
cat 文件名： 查看对应 url 文件的文件内容
vim :
i :进入编辑模式
esc: 退出编辑
:q!: 强制退出，不保存
:wq：保存退出
setnm: 设置行号

## git 高层命令：

    *配置 个人邮箱和yonghuming
        git config --global user.name 'muhuck'
        git config --global user.email 156228894@qq.com
            选项有： --system
                    --global
                    无选项  为当前项目配置用户
    *解除配置：
        git config --global --unset user.name
        git config --global --unset user.email
    git init ：初始化仓库
    创建工作目录，对工作目录进行修改
    git status : 检查文件状态 （已跟踪（已提交，已修改，已暂存），未跟踪）
    git add 文件或目录 ：将修改添加到暂存区 工作目录 到 版本库（一个文件对应一个git对象） 再到 暂存区  一次提交 至少包括一个git对象 一个树对象 一个提交对象 。。。 执行之后文件从未跟踪状态变为已跟踪
        对应底层操作：
        git hash-object -w 文件名
        git update-index
    git commit : 可以打开编辑器，添加较长的提交信息
        提交后暂存区并不会被清空 添加到暂存区后会覆盖暂存区中的同名文件
    git commit -m "提交信息" 将暂存区提交到版本库
        git write-tree
        git commit-tree
    git diff : 查看当前哪些更新没有被暂存
    git diff --cached : 查看哪些暂存还没有被提交
    跳过暂存区：
        git commit -a -m "提交信息"
        git 会把所有已经跟踪过的文件暂存起来一并提交，从而跳过git add的步骤
    移除文件：
        rm 文件名   然后git add 和git commit  git 对每一次的修改并不会删除
        或者 git rm 文件名  后git commit
    更改文件名称 ：
        mv 源文件 新文件名
        git mv 源文件名 新文件名 ：将工作目录中的文件进行重命名，再将修改添加到暂存区
    查看历史记录：
        git log 全部提交之后才能运行
        git log --pretty=oneline  把每一次提交提交信息显示在一行
        git log --oneline 简化显示一行
        git reflog 全部操作记录    q退出
    git ls-files -s : 查看暂存区文件
    git cat-file -p 暂存区hash值 ：查看暂存文件内容

## Git 分支

    分支为指向最新提交对象的指针
    git branch 分支名 ：
        创建一个新分支； 创建了一个可以移动的新的指针，这会在当前所在的提交对象上创建一个指针
    git checkout 分支名：
        切换分支  ， 切换分支HEAD、暂存区、工作目录会发生改变。
        每次切换分支前，当前分支一定要为已提交状态， 第一次新建的文件未提交或未暂存会污染其它分支
    git branch :
        显示分支列表
    git branch -d 分支名： -D为强制删除
        先切回主分支，再删除分支
    git log --oneline --decorate --graph --all:
        查看完整的分支图 ，起别名  git config --global alias.别名  'log --oneline --decorate --graph --all'
    git branch -v ：
        查看每一个分支的最后一次提交
    git branch 分支名 commitHash(提交对象的hash):
        新建一个分支并使该分支指向对应的提交对象，实现版本穿梭
    git checkout -b 分支名 ：
        表示新建一个分支并切换到分支
    git merge 要合并的分支名：
        合并分支,快进合并不会产生版本冲突。但当一个删除的分支，在一个新分支之后，且新分支被主分支合并，这时主分支会
        跑到新分支那里，主分支位于为删除的分支之前，如果那个未删除的分支修改了新分支修改的代码时，会产生版本冲突。

## Git 存储

    git stash :
        该命令会将未完成的修改保存到一个栈上，而你可以在任何时候重新应用这些修改

    git stash list :
        查看存储
    git stash apply
        运用存储栈顶的元素
        git stash drop stash@{0} 删除栈顶元素
    git stash pop ：
        运用栈顶元素并删除

### Git 撤销操作

    工作区
        如何撤回工作目录中的修改
            git checkout --文件名
    暂存区：
        如何撤回自己的暂存
            git reset HEAD 文件名 ： 取消暂存
    版本库：
        如何撤回自己的提交
            1. 提交注释书写错误
                git commit --amend

    git reset --soft HEAD~（或提交hash值） ：
        本质是撤销上一次的git commit 命令 。
            移动HEAD（带着分支）
    git reset --mixed HEAD~  等同于 git reset HEAD~ :
        依然会撤销上一次的提交，但还会取消暂存所有的东西。于是会回滚到所有git add 和git commit 之前
        暂存区会变动
    git reset --hard HEAD~ :
        撤销了最后的提交、git add、git commit 命令以及工作目录中的所有工作
        它会真正的销毁数据

## 恢复

    版本穿梭
    git branch recover-branch(分支名)  hash(提交的hash)
        在该分支中查看历史版本
    也可以硬重置
    git reset --hard hash

## 打 tag

    git tag 列出标签
    git tag -l 'v1.8.5*'
    git tag v1.1 commitHash(不指定就在最新的上面打tag)
        git可以给历史中的，某次提交打上标签以示重要。比较有代表性的是人们会使用这个功能来标记发布节点
    git show v1.0 ：
        查看提交对象
    git tag -d v1.0
        删除标签
    git checkout v1.0 ：
        版本检出，会发生头部分离，即HEAD脱离了分支，如果想继续进行操作，需在此HEAD上建立新分支
        git checkout -b '分支名'

## Git 远程仓库

    远程跟踪分支是远程分支状态的引用，它们是你不能移动的本地分支。当你做任何网络通讯操作时，它们会自动移动。
    它们以 remote/branch 形式命名。
    当克隆一个仓库时 它通常会自动的创建一个跟踪 origin/master 的master本地分支
    在新建其他分支时可以指定想要跟踪的远程跟踪分支
        git checkout -b 本地分支名 远程跟踪分支名
        git checkout --track 远程跟踪分支名
    将一个已经存在的分支 改成一个跟踪分支
        git branch -u 远程跟踪分支名
    查看有没有远程跟踪分支
        git branch -vv
    配置仓库别名：
        git remote add 远程仓库别名 仓库地址
    查看远程仓库使用的git别名与其对应的url
        git remote -v
    推送远程仓库：
        git push 仓库地址别名 分支名
    克隆 ：
        git clone 仓库地址
        远程仓库的名字“origin” 与分支的名字“master”一样，在git中没有特别的名字。同时master是当你运行npm init 时默认
        的起始分支名，原因仅仅是它的广泛使用，origin是当你运行git clone时默认的远程仓库的名字。
        如果运行 git clone -o bing 那么你的远程仓库别名为bing
    git fetch 远程仓库名：
        更新本地仓库 这时数据拿到了远程跟踪分支身上 在master上合并远程跟踪分支
    git push 远程仓库别名 --delete 分支名
        删除远程分支
    git remote prune 远程仓库别名 --dry-run
        列出仍在远程跟踪但是远程已被删除的无用分支
    git remote prune 远程仓库别名
        清除上面命令列出的远程跟踪
