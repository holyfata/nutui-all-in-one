import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { NoticeBar } from '@nutui/nutui-react'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const text = 'Welcome to NutUI React Playground.'

  return (
    <View className='index'>
      <NoticeBar content={text} />
    </View>
  )
}
