//这里后端传入的数据不含有key，在这个函数中给每一个树形结构加上一个key，用来渲染
function addKeysToData(
  data: Array<{ children: any }>,
  prefix = ""
): Array<{ children: Array<object> }> {
  if (data !== null) {
    return data.map((item, index) => {
      const key = prefix + index.toString(); // 生成当前节点的key

      // 判断当前节点是否有子节点
      if (item.children && item.children.length > 0) {
        // 递归调用addKeysToData函数为子节点添加key，并将当前节点的key作为前缀传递下去
        const children: any = addKeysToData(item.children, key + "-");

        // 返回带有key的当前节点及其子节点
        return {
          ...item,
          key,
          children,
        };
      }

      // 返回带有key的当前节点（无子节点）
      return {
        ...item,
        key,
      };
    });
  }

  return []; // 添加默认的返回结果，当data为null时返回空数组
}

export default addKeysToData;
