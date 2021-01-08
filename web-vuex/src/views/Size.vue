<template>
  <div class="page1">

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
        <template slot="title">
          <span
            style="
              float: left;
              font-weight: bold;
              font-size: 14px;
              color: #2c8df4;
              margin-left: 40px;
            "
            >添加</span
          >
        </template>
        <div class="page-top">
          <span>商品类别</span>
          <el-cascader
            v-model="valLianji"
            :options="optionsLeibie"
            clearable
            @change="selected"
          >
          </el-cascader>
          <br />
          <span style="margin-right: 45px">尺寸</span>
          <el-input
            style="width: 200px"
            placeholder="请输入内容"
            v-model="addSize.sizeText"
            clearable
          >
          </el-input>
          <br />
          <el-row>
            <el-button type="primary" @click="add">添加</el-button>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="page-bottom">
      <span style="line-height: 40px; margin: 0 20px">查询</span>
      <el-input
        v-model="query1.name"
        placeholder="请输入商品名称"
        style="margin-left: 0"
        @input="ret"
      ></el-input>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="danger" @click="delete1">删除</el-button>
      <el-table
        :data="SizetableData"
        border
        style="width: 100%"
        @row-click="getDataClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" @change="duoxuan">
        </el-table-column>
        <el-table-column prop="typeName" label="一级类别" width="180">
        </el-table-column>
        <el-table-column prop="name" label="二级类别" width="180">
        </el-table-column>
        <el-table-column prop="sizeText" label="尺码"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template >
            <el-button @click="delete1" type="text" size="small"
              >删除</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="dialogFormVisible = true"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align: right; margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total2"
      >
      </el-pagination>
    </div>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="editor">
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-cascader
            v-model="editor.valBianji"
            :options="optionsLeibie"
            clearable
            @change="selected"
          >
          </el-cascader>
        </el-form-item>

        <el-form-item label="尺码" :label-width="formLabelWidth">
          <el-input v-model="editor.sizeText" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="theEditor">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.page1 {
  padding: 20px;
}
.page-top {
  background: white;
  padding: 20px;
  & > span {
    line-height: 60px;
    width: 70px;
    margin-right: 20px;
    margin-left: 20px;
  }
  .el-button {
    margin: 20px 0 10px 20px;
  }
}
.page-bottom {
  margin-top: 20px;
  background: white;
  & > .el-input {
    width: 300px;
    margin: 10px 20px;
  }
}
</style>
<script>
export default {
  name: "size",
  data() {
    return {
      //所属分类
      value: "",
      //联机选择框
      valLianji: "",
      classify: [],
      //编辑
      editor: {
        id: [],
        name: "",
        sizeText: "",
        typeId: 0,
        //编辑所属分类
        valBianji: [0, 0],
      },
      //类别
      optionsLeibie: [
        //     {
        //     value: 'zhinan',
        //     label: '指南',
        //     children: [{
        //         value: 'shejiyuanze',
        //         label: '设计原则',
        //     },
        //         {
        //         value: 'daohang',
        //         label: '导航',
        //     }]
        // }
      ],
      //尺码
      chima1: "",
      tableData: [
        {
          leibie: "运动鞋",
          name: "aj",
          chima: "42",
        },
      ],
      //编辑弹框
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      //折叠面板
      activeNames: ["1"],
      //当前页数
      Sizepage1: 10,
      //当前页数多少条
      Sizelimit: 1,
      //渲染页数
      pageSize1: 0,
      //数据总数
      total2: "",
      currentPage4: 4,
      //渲染表格
      SizetableData: [],
      //查询
      query1: {
        id: 0,
        name: "",
      },
      //添加
      addSize: {
        id: 0,
        name: "",
        sizeText: "",
        typeId: 0,
      },
    };
  },
  methods: {
    //查询框删除刷新表格
    ret() {
      this.Sizepage();
    },
    //多选
    duoxuan() {
      console.log(this.checked);
    },
    //删除
    del() {
      this.$axios({
        url: "/goodsTypeSize/deleteGoodsSize",
        method: "get",
        params: {
          id: this.editor.id,
        },
      })
        .then((res) => {
          this.Sizepage();
        })
        .catch((err) => {});
    },
    //商品选中
    selected() {
      console.log(this.valLianji);
      console.log(this.optionsLeibie, "asd");
      //父级
      this.addSize.typeId = this.valLianji[0];
      //子级name
      for (let i = 0; i < this.optionsLeibie.length; i++) {
        for (let j = 0; j < this.optionsLeibie[i].children.length; j++) {
          if (this.valLianji[1] == this.optionsLeibie[i].children[j].value) {
            this.addSize.name = this.optionsLeibie[i].children[j].label;
          } else if (
            this.editor.valBianji[1] == this.optionsLeibie[i].children[j].value
          ) {
            this.editor.name = this.optionsLeibie[i].children[j].label;
          }
        }
      }
    },
    //查询所有类别
    queryAll() {
      this.$axios({
        url: "/goodsType/findGoodsTypeAll",
        method: "get",
        params: "",
      })
        .then((res) => {
          console.log("33333a", res);
          for (let i = 0; i < res.data.date.length; i++) {
            this.optionsLeibie.push({
              value: res.data.date[i].id,
              label: res.data.date[i].name,
              children: [],
            });
            for (let j = 0; j < res.data.date[i].list.length; j++) {
              this.optionsLeibie[i].children.push({
                value: res.data.date[i].list[j].id,
                label: res.data.date[i].list[j].name,
                id: res.data.date[i].list[j].typeId,
              });
            }
          }
          console.log("333333", this.optionsLeibie);
        })
        .catch((err) => {});
    },
    //编辑  点击获取表格行 数据
    getDataClick(val) {
      this.editor = val;
      console.log(111, val);
      this.editor.valBianji = [0, 0];
      this.editor.valBianji[0] = this.editor.typeId;
      for (let i = 0; i < this.optionsLeibie.length; i++) {
        if (this.optionsLeibie[i].value == this.editor.typeId) {
          for (let j = 0; j < this.optionsLeibie[i].children.length; j++) {
            if (this.editor.name == this.optionsLeibie[i].children[j].label) {
              this.editor.valBianji[1] = this.optionsLeibie[i].children[
                j
              ].value;
            }
          }
        }
      }
      console.log("235", this.editor.valBianji);
    },
    //编辑
    theEditor() {
      this.$axios({
        url: "/goodsTypeSize/updateGoodsSize",
        method: "post",
        data: {
          id: this.editor.id,
          name: this.editor.name,
          sizeText: this.editor.sizeText,
          typeId: this.editor.valBianji[0],
        },
      })
        .then((res) => {
          alert("修改成功");
          this.dialogFormVisible = false;
          this.Sizepage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加
    add() {
      this.$axios({
        url: "/goodsTypeSize/addGoods",
        method: "post",
        data: this.addSize,
      })
        .then((res) => {
          alert("添加成功");
          this.Sizepage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询
    query() {
      this.$axios({
        url: "/goodsTypeSize/findTypeSizeByName",
        method: "post",
        params: {
          name: this.query1.name,
        },
      })
        .then((res) => {
          alert("成功");
          console.log("aaa", res);
          this.SizetableData = [];
          this.SizetableData = res.data.date;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(row) {
      console.log(row);
    },
    //页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.Sizepage1 = `${val}`;
      this.Sizepage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.Sizelimit = `${val}`;
      this.Sizepage();
    },
    //页码
    Sizepage() {
      this.$axios({
        url: "/goodsTypeSize/findByPage",
        method: "get",
        params: {
          page: this.Sizelimit,
          limit: this.Sizepage1,
        },
      })
        .then((res) => {
          console.log(1111, res);
          this.total2 = res.data.date.count;
          this.pageSize1 = res.data.date.date.page;
          this.SizetableData = res.data.date.date;
        })
        .catch((err) => {});
    },
    //删除
    delete1() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "del",
      })
        .then(() => {
          this.del();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //多选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      console.log(this.multipleSelection);
      this.editor.id = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.editor.id.push(this.multipleSelection[i].id);
      }
      console.log(this.editor.id);
    },
    //折叠面板
    handleChange(val) {
      console.log(val);
    },
  },
  mounted() {
    this.Sizepage();
    this.queryAll();
  },
};
</script>