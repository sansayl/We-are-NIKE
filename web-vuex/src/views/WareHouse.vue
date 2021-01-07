<template>
  <div class="wareHouse">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about/fenlei' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <div class="wareHouseSelect">
      <el-form
        :inline="true"
        :model="selectdata"
        ref="selectdata"
        class="demo-form-inline"
      >
        <el-form-item label="" prop="workHouse">
          <el-input
            v-model="selectdata.workHouse"
            placeholder="仓库名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="workHouseMang">
          <!-- <el-select
            v-model="selectdata.workHouseMang"
            placeholder="仓库管理员"
          > -->
           <el-select
            v-model="selectdata.workHouseMang"
            placeholder="请选择仓库管理员"
            @change="showNumber"
          >
            <el-option
              v-for="item in houseStaff"
              :key="item.label"
              :label="item.name"
              :value="item.phone"
            ></el-option>
          </el-select>
            <el-option label="仓库管理员1" value="shanghai"></el-option>
            <el-option label="仓库管理员2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectHouse">查询</el-button>
          <el-button type="primary" @click="addVisible = true" class="wareAddBt"
            >新增</el-button
          >
          <el-button type="primary" @click="resetForm('selectdata')"
            >重置</el-button
          >
          <el-button type="danger" class="deleBt" @click="delAll()"
            >删除</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 中间表格 -->
    <div class="contTable">
      <template>
        <el-table
          @row-click="getDataClick"
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="仓库编号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="仓库名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="仓库地址" width="180">
          </el-table-column>
          <el-table-column prop="admin" label="仓库管理员" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="电话号码" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <el-button @click="editVisible = true" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="detailVisible = true"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="wareHouseDele"
              class="tabDelBt"
              >删除</el-button
            >
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 页码 -->
    <div class="warePage">
      <div class="block">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableTotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="50%">
      <el-form
        :model="addData"
        :rules="addrules"
        ref="addData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="address">
          <el-input v-model="addData.address"></el-input>
        </el-form-item>

        <el-form-item label="仓库管理员" prop="phone">
          <el-select
            v-model="addData.phone"
            placeholder="请选择仓库管理员"
            @change="showNumber"
          >
            <el-option
              v-for="item in houseStaff"
              :key="item.label"
              :label="item.name"
              :value="item.phone"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="addData.admin"></el-input> -->
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="addData.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddDataBt('addData')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
      <el-form
        :model="thisRoledata"
        ref="thisRoledata"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="thisRoledata.name"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="address">
          <el-input v-model="thisRoledata.address"></el-input>
        </el-form-item>

        <el-form-item label="仓库管理员" prop="admin">
          <el-select
            v-model="thisRoledata.admin"
            placeholder="请选择仓库管理员"
            @change="showNumber()"
          >
            <el-option
              v-for="item in houseStaff"
              :key="item.value"
              :label="item.name"
              :value="item.phone"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="addData.admin"></el-input> -->
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="houseStaff.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editHouse">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="detailVisible" width="50%">
      <el-form
        :model="thisRoledata"
        ref="thisRoledata"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="thisRoledata.name" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="address">
          <el-input v-model="thisRoledata.address" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="仓库管理员" prop="admin">
          <el-input v-model="thisRoledata.admin" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="houseStaff.phone" disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.wareHouse {
  padding: 20px;
}
</style>
<script>
export default {
  name: "warehouse",
  data() {
    return {
      // 新增仓库数据
      addData: {
        id: "",
        admin: "", //管理员
        name: "", //仓库名
        address: "", //仓库地址
        phone: "", //联系电话
      },
      // 输入校验
      addrules: {
        name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
          {
            min: 3,
            max: 40,
            message: "长度在 3 到 40 个字符",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入仓库地址", trigger: "change" },
        ],
        admin: [
          { required: true, message: "请输入管理员名称", trigger: "change" },
        ],
      },
      // 查询员工(仓库管理员)
      houseStaff: [],
      //当前点击的数据
      thisRoledata: {
        id: "",
        name: "",
        address: "",
        admin: "",
        phone: "",
      },

      // 搜索
      selectdata: {
        workHouse: "",
        workHouseMang: "",
      },
      // 表格数据
      tableData: [
        {
          id: "",
          name: "",
          address: "",
          admin: "",
          phone: "",
        },
      ],
      //批量删除数组
      delalldata: [],
      //页码
      currentPage1: 5,
      limit: 5,
      thisPage: 1,
      tableTotal: 1, //列表总数

      addVisible: false, // 新增
      editVisible: false, //编辑
      detailVisible: false, //详情
    };
  },
  // 组件加载请求列表接口
  mounted() {
    this.selectHouseAll(); // 获取请求列表
    this.selectStaff();
  },
  methods: {
    // 点击获取当前行数据
    getDataClick(val) {
      this.thisRoledata = val;
      console.log(this.thisRoledata);
    },
    //新增页选中管理员后获取电话号码
    showNumber(v) {
      this.houseStaff.forEach((item) => {
        if (item.phone === v) {
          this.addData.admin = item.name;
        }
      });
      //this.houseStaff.phone = this.addData.admin;
      console.log(this.addData.admin, "打印");
    },
    //新增提交
    AddDataBt(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addData.phone = 1;
          this.$axios({
            url: "/repository/add",
            method: "post",
            data: this.addData,
          })
            .then((res) => {
              alert("新增成功");
              this.addVisible = false;
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 数据列表
    selectHouseAll() {
      this.$axios({
        url: "/repository/list",
        method: "post",
        data: {
          page: this.thisPage, //当前页
          pageSize: this.limit,
        },
      })
        .then((res) => {
          this.tableData = res.data.date;
          this.tableTotal = res.data.count;

          console.log(res, 223);
          // this.tableData=res.data
          // this.tableTotal=res.data
        })
        .catch((err) => {
          alert(err);
        });
    },
    //编辑
    editHouse() {
      this.$axios({
        url: "/repository/update",
        method: "post",
        data: this.thisRoledata,
      })
        .then((res) => {
          (this.editVisible = false), alert("修改成功");
        })
        .catch((err) => {
          alert(err);
        });
    },

    // 查询员工
    selectStaff() {
      this.$axios({
        url: "/employee/findname",
        method: "post",
        data: {
          page: 1,
          pageSize: 10,
          roleid: 5,
        },
      })
        .then((res) => {
          this.houseStaff = res.data.date;
          let newsetroledata = [];
          this.houseStaff.forEach((v, i) => {
            console.log(v, i, "查询员工名称与员工电话号码");
            newsetroledata.push({
              name: v.name,
              phone: v.phone,
            });
          });
          this.houseStaff = newsetroledata;
          console.log(this.houseStaff, "sfsdfsdf");
        })
        .catch((err) => {
          alert(err);
        });
    },
    //查询
    selectHouse() {
      this.$axios({
        url: "/repository/list",
        method: "post",
        data: {
          admin: this.selectdata.workHouseMang,
          name: this.selectdata.workHouse,
          page: this.thisPage, //当前页
          pageSize: this.limit,
        },
      })
        .then((res) => {
          this.tableData = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.tableData.push(res.data.date[i]);
          }
        })
        .catch((res) => {});
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
       this.selectHouseAll();
    },

    //页码
    handleSizeChange(val) {
      (this.limit = ` ${val} `), this.selectHouseAll();
      console.log(this.limit);
    },
    handleCurrentChange(val) {
      this.thisPage = `${val}`;
      this.selectHouseAll();
      console.log(`当前页: ${val}`);
    },
    // 表格的单选多选
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
      this.delalldata = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.delalldata.push(this.multipleSelection[i].id);
      }
      console.log(this.delalldata, "删除全部");
    },
    //单个删除
    wareHouseDele() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/repository/delete",
            method: "get",
            params: {
              id: this.thisRoledata.id,
            },
          })
            .then((res) => {
              this.selectHouseAll();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    delAll() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/repository/deleteIds",
            method: "post",
            data: {
              ids: this.delalldata,
            },
          })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.selectHouseAll();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wareHouse {
  padding: 20px;
}
.el-breadcrumb {
  padding-left: 20px;
}

.wareHouseSelect {
  width: 100%;
  height: 60px;
  // background: teal;

  border-top: gray;
}
//搜索
.el-form-item {
  margin-bottom: 0 !important;
}
.el-form {
  padding: 20px;
}
//新增按钮样式
.el-button {
  border: none;
}
.wareAddBt {
  background: #67c23a;
}
//中间数据表格
.contTable {
  padding: 20px;
}
//表头
.el-table-column {
  text-align: center;
}
//页码
.warePage {
  padding-left: 20px;
  margin-top: 20px;
}
//新增页面的样式
.el-form-item {
  margin-bottom: 20px !important;
}

.el-button {
  border: none;
}
// 删除按钮
.tabDelBt {
  color: #f56c6c !important ;
}
</style>