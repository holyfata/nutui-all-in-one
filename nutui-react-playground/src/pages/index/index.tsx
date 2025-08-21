import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { NoticeBar, Uploader, UploaderFileItem } from '@nutui/nutui-react'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const text = 'Welcome to NutUI React Playground.'

  const upload = async (file: File) => {
    console.log("@hf===>", 'file: ', file)
    const formData = new FormData();
    formData.append('file', file)
    const response = await fetch('http://127.0.0.1:3000/upload', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    const { filePath } = result
    return { url: filePath }
  }

  const onFileChange = (files: UploaderFileItem[]) => {
    console.error('@hf===>onFileChange', files)
  }

  return (
    <View className='index'>
      <NoticeBar content={text} />
      <Uploader 
        upload={(file: File) => upload(file)}
        previewType='list'
        uploadLabel="上传文件"
        onChange={onFileChange}
      />
    </View>
  )
}
