<template>
  <div class="staffPage">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="staffSelect">
      <template>
        <el-form
          :inline="true"
          :model="selectdata"
          ref="selectdata"
          class="demo-form-inline"
        >
          <el-form-item label="" prop="name">
            <el-input
              v-model="selectdata.name"
              placeholder="员工姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="role">
            <el-select v-model="selectdata.role" placeholder="角色">
              <el-option
                v-for="item in roleData"
                :key="item.value"
                :label="item.rolename"
                :value="item.rolename"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="phone">
            <el-input
              v-model="selectdata.phone"
              placeholder="电话号码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectData()">查询</el-button>
            <el-button
              type="primary"
              class="staffAddBt"
              @click="addVisible = true"
              >新增</el-button
            >
            <el-button @click="resetSelect('selectdata')">重置</el-button>
            <el-button type="danger" class="deleBt" @click="delAll()"
              >删除</el-button
            >
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </template>
    </div>
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
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="电话号码" width="160">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="160">
          </el-table-column>
          <el-table-column prop="rolename" label="角色" width="160">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template class="staffTabBt">
              <el-button @click="editVisible = true" type="text" size="small"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="setRoleVisible = true"
                >设置角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="staffDetailVisible = true"
                class="staffDetailBt"
                >详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="staffDele"
                class="tabDelBt"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="staffPage">
      <div class="block">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableTotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <el-form
        :model="staffAddData"
        :rules="addRules"
        ref="staffAddData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="staffAddData.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="staffAddData.sex"
            placeholder="请选择性别"
            class="sexChoose"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="staffAddData.age"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="staffAddData.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="staffAddData.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="staffAddData.address"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="staffAddData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSave('staffAddData')"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form
        :model="thisRowData"
        :rules="addRules"
        ref="thisRowData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="thisRowData.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="thisRowData.sex"
            placeholder="请选择性别"
            class="sexChoose"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="thisRowData.age"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="thisRowData.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="thisRowData.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="thisRowData.address"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="thisRowData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStaffData('tableData')"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="设置角色" :visible.sync="setRoleVisible" width="60%">
      <template>
        <el-transfer
          v-model="value"
          :data="datanew"
          @right-check-change="change"
        ></el-transfer>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="staffDetailVisible" width="60%">
      <el-form
        :model="thisRowData"
        ref="thisRowData"
        label-width="100px"
        class="demo-ruleForm detailPage"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="thisRowData.name" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-input v-model="thisRowData.sex" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="thisRowData.age" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="thisRowData.phone" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="thisRowData.email" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="thisRowData.address" disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="staffDetailVisible = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "staffmang",
  data() {
    return {
      datanew: [],
      value: [1, 4],
      //查询
      selectdata: {
        user: "",
        role: "",
        phone: "",
      },
      // 数据列表
      tableData: [
        {
          name: this.name,
          sex: this.sex,
          rolename: this.rolename,
          phone: this.phone,
          email: this.email,
          address: this.address,
        },
      ],
      //当前点击行的数据
      thisRowData: {
        id: "",
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        roleid: "",
      },
      //当前选中的角色(穿梭框)
      chooserole: [],
      chooseId: "",
      //角色数据
      roleData: [
        {
          rolename: "",
        },
      ],
      //批量删除
      delalldata: [],

      addVisible: false, //新增弹窗
      editVisible: false, //编辑页弹窗
      setRoleVisible: false, //设置角色弹窗
      staffDetailVisible: false, //员工详情弹窗
      // 员工新增数据
      staffAddData: {
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: "",
        address: "",
        password: "",
      },
      // 输入校验
      addRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "change" },
        ],
        // address: [
        //   { required: true, message: "请输入家庭地址", trigger: "blur" },
        // ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      dataTree: {},

      //确认是否删除
      visible: false,
      //页码
      currentPage4: 1,
      tableTotal: 1, //列表总数
      pagesize: 5,
      thisPage: 1,
      limit: 5,

      //选择角色弹窗
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
    };
  },
  // 组件加载请求列表接口
  mounted() {
    this.selectStaffAll(); // 获取请求列表
  },
  created() {
    this.slecteRole(); //页面查询角色
  },
  methods: {
    //穿梭框选中
    change() {
      this.chooserole = this.value;
      console.log(this.chooserole, "dsjah");

      for (let i = 0; i < this.chooserole.length; i++) {
        this.chooseId = this.chooserole[i];
      }
      console.log(this.chooseId, "shudgus");
    },

    // 新增提交数据验证
    addSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            url: "/employee/add",
            method: "post",
            data: this.staffAddData,
          })
            .then((res) => {
              alert("新增成功");
              this.addVisible = false;
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          alert("提交失败！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取员工数据-渲染员工列表
    selectStaffAll() {
      this.$axios({
        url: "/employee/findname",
        method: "post",
        data: {
          page: this.thisPage, //当前页
          pageSize: this.limit,
         
        },
      })
        .then((res) => {
          console.log(res, "员工数据");
          this.tableData = res.data.date; //获取表格数据
          this.tableTotal = res.data.count; //获取列表数据总数
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击获取一行数据
    getDataClick(val) {
      this.thisRowData = val;
      console.log(this.thisRowData, "点击的数据");
    },
    //编辑
    editStaffData() {
      this.$axios({
        url: "/employee/update",
        method: "post",
        data: this.thisRowData,
      })
        .then((res) => {
          alert("编辑成功");
          this.editVisible = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询
    selectData() {
      this.$axios({
        url: "/employee/findname",
        method: "post",
        data: this.selectdata,
      })
        .then((res) => {
          this.tableData = [];
          console.log(res, 2222);
          for (let i = 0; i < res.data.date.length; i++) {
            this.tableData.push(res.data.date[i]);
          }

          // this.selectStaffAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置查询
    resetSelect(formName) {
      this.$refs[formName].resetFields();
      this.selectStaffAll();
    },
    // 设置角色
    setRoleSubmit() {
      console.log(this.thisRowData, "性能");
      this.$axios({
        url: "/employee/updateRole",
        method: "post",
        data: {
          id: this.thisRowData.id,
          roleid: this.chooseId,
        },
      })
        .then((res) => {
          alert("修改角色成功");
          this.selectStaffAll();
          this.setRoleVisible = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询角色
    slecteRole() {
      this.$axios({
        url: "/role/status",
        method: "get",
        params: {
          isuse: 1,
        },
      })
        .then((res) => {
          this.roleData = res.data.date;
          let n = res.data.date;

          let data = [];
          for (let i = 1; i < n.length; i++) {
            data.push({
              key: n[i].id,
              label: n[i].rolename,
              disabled: i % 4 === 0,
            });
          }
          this.datanew = data;
          // this.setroledata = res.data.date;
          // console.log(this.setroledata, "这是设置员工的橘色");
          // let newsetroledata = [];
          // this.setroledata.forEach((v, i) => {
          //   console.log(i, v);
          //   newsetroledata.push({
          //     label: v.rolename,
          //     key: v.id,
          //   });
          // });
          // //console.log(11111111,this.data,this.setroledata)
          // this.data = newsetroledata;

          // console.log(2222, this.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //页码
    handleSizeChange(val) {
      this.limit = ` ${val}`;
      this.selectStaffAll();
      console.log(this.limit);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.thisPage = `${val}`;
      this.selectStaffAll();
      // console.log(`当前页: ${val}`);
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
    },
    // 表格内删除功能
    staffDele() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/employee/delete",
            method: "get",
            params: {
              id: this.thisRowData.id,
            },
          })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.selectStaffAll();
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
    //批量删除
    delAll() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/employee/deletes",
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
              this.selectStaffAll();
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






<style lang="less"  scoped>
.el-breadcrumb {
  padding-bottom: 20px;
}
.staffPage {
  padding: 20px;
}
.el-tabs__header {
  margin: 0 !important;
}
// 顶部搜索盒子样式
.staffSelect {
  width: 100%;
  height: 60px;
  border-top: gray;
}
//搜索
.el-form-item {
  margin-bottom: 0 !important;
}
.el-button {
  border: none;
}
//新增按钮样式
.staffAddBt {
  background: #67c23a;
}
// 删除按钮
.deleBt {
  background: #f56c6c !important;
  color: white;
}

//表格内按钮样式
.staffTabBt .el-button {
  font-size: 14px !important;
}
// 删除按钮
.tabDelBt {
  color: #f56c6c !important ;
}
//表头
.el-table-column {
  text-align: center;
}
// 详情按钮
.staffDetailBt {
  color: #67c23a;
}
// 删除按钮
.tabDelBt {
  margin-left: 5px;
}

//页码
.staffPage {
  padding-left: 20px;
  margin-top: 20px;
}
.el-pagination {
  padding: 0;
}
.clearfix {
  clear: both;
}

// 新增弹窗内样式
.el-form .el-form-item {
  margin-bottom: 20px !important;
}
// 新增页内性别下拉框样式
.sexChoose {
  width: 287px !important;
}

// 详情页样式
.detailPage .el-form-item {
  width: 400px;
  float: left;
  border: 1px lightgary solid;
  border-radius: 0;
}
</style>