# ISSUE_3333

> FIX_DATE: 2025/08/22
> 
> ISSUE_LINK: https://github.com/jdf2e/nutui-react/issues/3333
> 
> PR_LINK: https://github.com/jdf2e/nutui-react/pull/3343

## NutUI React 包名

@nutui/nutui-react

## NutUI React 版本号

3.0.18

## 平台

H5

## 重现链接

```bash
git clone https://github.com/holyfata/nutui-all-in-one.git
git checkout feature_hyq-MAIN-uploader-20250821-nopng

nvm use

cd nutui-react-mini-server
bun install
bun run start

cd ../nutui-react-playground
yarn
yarn dev:h5
```

![alt text](https://pic1.imgdb.cn/item/68a7d29b58cb8da5c841b453.png)

## 修复思路

uploader组件在判断preview且file.type!='image'时会直接跳过预览列表

```ts
const tasks = _files.map((file) => {
    const info: any = {
        uid: idCountRef.current++,
        status: autoUpload ? 'uploading' : 'ready',
        file,
        message: autoUpload
            ? locale.uploader.uploading
            : locale.uploader.waitingUpload,
        name: file.name,
        type: file.type,
    }
    if (preview && file.type?.includes('image')) {
        const reader = new FileReader()
        reader.onload = (event: ProgressEvent<FileReader>) => {
            // ...
        }
        reader.readAsDataURL(file)
        }
    return info
})
```

修改为在previewType为picture且file.type不是image的情况下才跳过setFileList

```ts
const tasks = _files.map((file) => {
    const info: any = {
        uid: idCountRef.current++,
        status: autoUpload ? 'uploading' : 'ready',
        file,
        message: autoUpload
            ? locale.uploader.uploading
            : locale.uploader.waitingUpload,
        name: file.name,
        type: file.type,
    }
    if (preview) {
        // 如果是图片类型的预览且上传的文件非图片则不放入文件列表中
        if (previewType === 'picture' && !file.type?.includes('image')) {
            return info
        }
        const reader = new FileReader()
        reader.onload = (event: ProgressEvent<FileReader>) => {
            fileListRef.current = [
            ...fileListRef.current,
            {
                ...info,
                url: (event.target as FileReader).result as string,
            },
            ]
            setFileList(fileListRef.current)
        }
        reader.readAsDataURL(file)
    }
    return info
})
```
