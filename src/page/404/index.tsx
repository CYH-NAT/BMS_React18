//每個頁面最好有自己的文件夾
import { Button, Empty, Typography } from 'antd';
import { Navigate,Link } from 'react-router-dom';
function NotFound(){

    return <div style={{marginTop:'100px'}}>
          <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60 }}
    description={
      <Typography.Text>
        溫馨提示 <a href="#API">頁面走丟啦</a>
      </Typography.Text>
    }
  >
    <Button type="primary" ><Link to={'/dashboard'}>回到首頁</Link></Button>
  </Empty>
    </div>
}

export default NotFound