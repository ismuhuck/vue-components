<template>
  <div>
    <section class="main">
      <Table :columns="columns" :data="tableData"></Table>
    </section>
  </div>
</template>
<script>
import expandRow from "../components/TableExpand";
export default {
  components: {
    expandRow
  },
  data() {
    let this_ = this;
    return {
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            console.log("params", params);
            if (params.index === 0) {
              return h(expandRow, {
                props: { row: params.row }
                // on:    {  click: () => { this.expand(params.row, params.index)} }
              });
            } else if (params.index === 1) {
              return h("Input", {
                props: {
                  type: "textarea"
                }
              });
            }
          }
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "操作",
          render(h, params) {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {},
                on: {
                  click: () => {
                    this_.expand(params.row, params.index);
                  }
                }
              },
              params.row._text
            );
          }
        }
      ],
      tableData: [
        {
          name: "泰植",
          age: 23,
          _text: "展开"
        },
        {
          name: "金来沅",
          age: 33,
          _text: "查看"
        }
      ]
    };
  },
  methods: {
    //点击展开收起
    expand(item, index) {
      // console.log(item,index);
      // 展开点击项,展开之前恢复到初始状态
      this.tableData.sort(); //更新视图
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i]._expanded = false;
        this.tableData[i]._text = "展开";
      }
      //点击展开
      if (item._expanded) {
        // this.tableData.splice()
        // this.tableData.push()
        this.tableData.sort(); //更新视图
        this.tableData[index]._expanded = false;
        this.tableData[index]._text = "展开";
      } else {
        this.tableData.splice();
        this.tableData[index]._expanded = true;
        this.tableData[index]._text = "收起";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .ivu-table-cell-expand {
  display: none;
}
</style>
