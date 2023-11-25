import React from "react"
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationNotFound, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';


function Page404(){
    return(
        <Empty
        image={<IllustrationNotFound style={{ width: 300, height: 300 }} />}
        darkModeImage={<IllustrationConstructionDark style={{ width: 300, height: 300 }} />}
        title={'页面404'}
        description="当前暂未开放，敬请期待。"
        />
    )
}

export default Page404