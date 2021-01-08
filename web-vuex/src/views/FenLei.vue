<template>
  <div class="page1">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-collapse v-model="activeName" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span
            style="
              float: left;
              font-weight: bold;
              font-size: 14px;
              color: #2c8df4;
              margin-left: 20px;
            "
            >添加</span
          >
        </template>
        <el-tabs v-model="activeNames" type="card">
          <el-tab-pane label="一级类别" name="first">
            <div class="Fenlei-top">
              <el-form
                :model="oneType"
                status-icon
                ref="oneType"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="类别名称" prop="name">
                  <el-input
                    type="text"
                    v-model="oneType.name"
                    autocomplete="off"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
                <br />
                <el-form-item label="类别描述" prop="description">
                  <el-input
                    type="textarea"
                    v-model="oneType.description"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>

                <el-row>
                  <el-button type="primary" @click="oneTypeAdd(oneType)"
                    >保存</el-button
                  >
                  <el-button plain @click="resetForm('oneType')"
                    >重置</el-button
                  >
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="二级类别" name="second">
            <div class="Fenlei-top">
              <el-form
                :model="twoType"
                :rules="rules"
                ref="twoType"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="所属分类" :label-width="formLabelWidth">
                  <el-select
                    v-model="value"
                    placeholder="请选择"
                    @change="classify"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <br />
                <el-form-item label="分类名称" prop="name">
                  <el-input
                    v-model="twoType.name"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
                <br />
                <el-form-item label="分类描述" prop="description">
                  <el-input
                    type="textarea"
                    v-model="twoType.description"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>

                <el-row>
                  <el-button type="primary" @click="twoTypeAdd">保存</el-button>
                  <el-button plain @click="resetForm('twoType')"
                    >重置</el-button
                  >
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
    <!--查询-->
    <div class="Fenlei-botton">
     

      <el-select
        v-model="chaxunleibie"
        placeholder="请选择类别"
        @change="xuanze"
      >
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <el-input
        @input="ret"
        placeholder="请输入分类名称"
        prefix-icon="el-icon-search"
        v-model="query.name"
        style="width: 300px; margin: 10px 20px 10px 20px"
      >
      </el-input>

      <el-row style="display: inline-block">
        <el-button type="primary" @click="query3">查询</el-button>
        <el-button type="danger" @click="delete1">删除</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @row-click="getDataClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="二级分类" width="180">
        </el-table-column>
        <el-table-column prop="typeName" label="一级类别" width="180">
        </el-table-column>
        <el-table-column prop="description" label="分类描述"></el-table-column>

        <el-table-column label="操作" width="200px">
          <template>
            <el-button size="mini" @click="dialogFormVisible = true"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="delete1"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="RowData" ref="RowData">
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input
              v-model="RowData.description"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="所属分类" :label-width="formLabelWidth">
            <el-select
              v-model="value1"
              placeholder="请选择"
              @change="classify1"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input
              class="input"
              placeholder="请输入内容"
              v-model="RowData.name"
              clearable
              style="width: 225px; margin: 0"
            >
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editor">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total1"
      >
      </el-pagination>
    </div>
  </div>
</template>
<style lang="less" scoped>
.el-breadcrumb{
  padding-bottom: 20px;
}
.page1 {
  padding: 20px;
}
.Fenlei-top {
  background: white;
  & > span {
    line-height: 80px;
    font-size: 14px !important;
  }
  span {
    margin-left: 40px;
    margin-right: 20px;
  }
  .el-button {
    margin-left: 40px;
    margin-top: 30px;
    margin-bottom: 40px;
    font-size: 13px;
    line-height: 10px;
  }
  margin-bottom: 60px;
}
.block {
  text-align: right;
  margin-top: 20px;
}
.del {
  color: aquamarine;
  background: aquamarine;
}
.Fenlei-botton {
  margin-top: 20px;
  background: white;
}
</style>
<script>
export default {
  name: "fenlei",
  data() {
    return {
      //批量删除
      delS: [],
      //查询类别选择
      options2: [
        {
          id: 0,
          value: "商品类别",
        },
        {
          id: 1,
          value: "商品名称",
        },
      ],
      chaxunleibie: 1,

      FenleiValue: "",
      value: "",
      //编辑属性下拉选择
      value1: "",
      //所属分类
      options: [],
      //每页数
      limit1: [],
      rules: {},
      //teb
      activeNames: "first",
      activeName: "[1]",
      //一级类别查询
      queryLeibei: "",
      //查询
      query: {
        name: "",
        type: 1,
        typeName: "",
      },
      //编辑行数据
      RowData: {
        description: "",
        id: 29,
        list: null,
        name: "",
        type: 0,
        typeId: 0,
        typeName: null,
      },
      //查询
      query1: "",
      // 一级分类数据
      oneType: {
        description: "",
        id: null,
        list: [{}],
        name: "",
        type: 0,
        typeId: 0,
      },
      //二级分类数据
      twoType: {
        description: "",
        id: 0,
        list: [{}],
        name: "",
        type: 1,
        typeId: 0,
      },
      //二级类别
      msg: "", //分类名称输入框内容
      msg1: "", // 分类描述输入框
      //表格
      tableData: [],
      //页码
      currentPage4: 4,
      //编辑弹框
      dialogFormVisible: false,
      formLabelWidth: "100px",
      //每页数
      pageSize1: 0,
      //数据总数
      total1: 0,
      //查询
      loginData: "",
      page1: "",
    };
  },
  methods: {
    //渲染
    apply() {
      this.$axios({
        url: "/goodsType/findGoodsTypeAll",
        method: "get",
        params: "",
      })
        .then((res) => {
          console.log("bbb", res);
          // this.tableData=res.data.date;
          let arr4 = [];
          let json = {};
          let n = 0;
          this.options = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.options.push({
              value: res.data.date[i].name,
              id: res.data.date[i].id,
            });
            for (let j = 0; j < res.data.date[i].list.length; j++) {
              n++;
              json[n] = {
                id1: res.data.date[i].list[j].id,
                id2: res.data.date[i].id,
                name1: res.data.date[i].list[j].name,
                name2: res.data.date[i].name,
                description: res.data.date[i].list[j].description,
              };
              arr4[n - 1] = json[n];
            }
            console.log(arr4);
          }
          // this.tableData=arr4;
          console.log("222", this.options);
          console.log(3333, json);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //编辑
    editor() {
      this.$axios({
        url: "/goodsType/updateGoods",
        method: "post",
        data: {
          description: this.RowData.description,
          id: this.RowData.id,
          name: this.RowData.name,
          type: 1,
          typeId: this.RowData.typeId,
        },
      })
        .then((res) => {
          console.log("成功");
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    },
    //编辑点击获取数据
    getDataClick(val) {
      this.RowData = val;
      this.value1 = val.typeId;
      console.log("vvv", val);
      this.delS = [];
      this.delS = val.id;
    },
    //删除
    tableDel() {
      this.$axios({
        url: "/goodsType/deleteGoods",
        params: {
          ids: this.delS,
        },
      })
        .this((res) => {
          console.log(1111);
        })
        .catch((err) => {
          console.log(res);
        });
    },
    //查询
    query3() {
      this.$axios({
        url: "/goodsType/findGoodsType",
        method: "post",
        data: this.query,
      })
        .then((res) => {
          console.log("aaa", res);
          alert("成功");
          for (let i = 0; i < res.data.date.length; i++) {
            if (res.data.date[i].type == 0) {
              this.tableData = [];
              this.tableData.push({
                id: res.data.date[i].id,
                type: res.data.date[i].type,
                typeId: res.data.date[i].typeId,
                description: res.data.date[i].description,
                typeName: res.data.date[i].name,
              });
            } else if (res.data.date[i].type == 1) {
              this.tableData = [];
              this.tableData.push({
                id: res.data.date[i].id,
                type: res.data.date[i].type,
                typeId: res.data.date[i].typeId,
                name: res.data.date[i].name,
                description: res.data.date[i].description,
              });
            }
          }
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询后返回表格
    ret() {
      this.page();
    },
    // 页面渲染 页码
    page() {
      this.$axios({
        url: "/goodsType/findByPage",
        method: "get",
        params: {
          page: this.page1,
          limit: this.limit1,
        },
      })
        .then((res) => {
          console.log(111112, res.data.date.list);
          this.pageSize1 = res.data.date.pageSize;
          this.total1 = res.data.date.total;
          this.tableData = [];
          for (let i = 0; i < res.data.date.list.length; i++) {
            for (let j = 0; j < res.data.date.list[i].list.length; j++) {
              this.tableData.push({
                description: res.data.date.list[i].list[j].description,
                id: res.data.date.list[i].list[j].id,
                list: null,
                name: res.data.date.list[i].list[j].name,
                type: 1,
                typeId: res.data.date.list[i].list[j].typeId,
                typeName: res.data.date.list[i].name,
              });
            }
          }
          console.log(1122211, this.tableData);
          // this.options=res.data.data.list
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //下拉选择id
    classify() {
      console.log(this.value);
      this.twoType.typeId = this.value;
      this.RowData.typeId = this.value1;
    },
    //下拉选择id编辑
    classify1() {
      console.log(this.value);
      this.RowData.typeId = this.value1;
    },
    //添加一级分类
    oneTypeAdd() {
      this.$axios({
        url: "/goodsType/addGoods",
        method: "post",
        data: this.oneType,
      })
        .then((res) => {
          console.log("aaa", res.data);
          alert("成功");
          this.apply();
          this.page();
        })
        .catch((err) => {
          alert(err);
        });
    },
    // 添加二级分类
    twoTypeAdd() {
      this.$axios({
        url: "/goodsType/addGoods",
        method: "post",
        data: this.twoType,
      })
        .then((res) => {
          console.log(333, res);
          console.log(this.twoType);
          alert("添加成功");
          this.apply();
          this.page();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit1 = `${val}`;
      this.page();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page1 = `${val}`;
      this.page();
    },
    //删除按钮
    delete1() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/goodsType/deleteGoods",
            params: {
              ids: this.delS,
            },
          })
            .this((res) => {
              console.log(1111);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.page();
            })
            .catch((err) => {
              console.log(res);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //teb
    handleClick(tab, event) {
      console.log(tab, event);
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
      this.delS = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.delS.push(this.multipleSelection[i].id);
      }
    },

    //折叠
    handleChange(val) {
      console.log(val);
    },
    //查询选择
    xuanze() {
      console.log(this.chaxunleibie);
      this.query.type = this.chaxunleibie;
    },
  },
  mounted() {
    this.page();
    this.apply();
    this.ret();
  },
};
</script>

