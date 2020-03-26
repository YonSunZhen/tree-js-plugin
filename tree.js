// 函数内部的变量私有，不会污染全局
(function () {
  /**
   * @param rootNo 根节点编号标识 如 '0'||'root'
   * @param no 节点编号标识 如 'no'
   * @param parentNo 节点的父节点编号标识 如 'parent_no'
   */
  const api = function (rootNo, no, parentNo) {
    // this指向调用它的那个对象
    this.rootNo = rootNo;
    this.no = no;
    this.parentNo = parentNo;
  }
  // 暴漏到外部的方法 api中的this和原型中的this指向是一样的
  api.prototype = {
    /**
     * 数组生成树结构数据
     * @param data 
     */
    generateTree (data) {
      let result;
      for (let i = 0; i < data.length; i++) {
        if (data[i][this.no] === this.rootNo) {
          const item = {
            data: data[i],
            children: []
          };
          this.generateChildTree(data, data[i][this.no], item);
          result = item;
        }
      }
      return result;
    },

    generateChildTree (data, parent_no, parentItem) {
      // 这里操作data只是针对这个函数中的data变量,之前函数中的data变量并未改变,保存在内存中 后面再改进
      data = data.filter((item) => {
        return (item[this.no] !== parent_no);
      });
      parentItem.children = parentItem.children ? parentItem.children : [];
      for (let i = 0; i < data.length; i++) {
        if (data[i][this.parentNo] === parent_no) {
          const itemTemp = {
            data: data[i]
          };
          parentItem.children.push(itemTemp);
          // 就当前节点继续往下面找, 找到的话进, 没有的话children数组即为空           
          this.generateChildTree(data, data[i][this.no], itemTemp);
        }
      }
    }
  }
  // this指向window
  this.MyTree = api;
})();
